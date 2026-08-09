import { randomUUID } from "node:crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Object storage for the media library.
 *
 * Uploads go straight from the browser to the bucket using a short lived
 * presigned PUT, so binaries never pass through a serverless function and
 * we stay clear of the request body limit. The route that mints the
 * signature is the trust boundary: it authenticates, picks the key, and
 * pins the content type.
 *
 * Objects are expected to be publicly readable. This is a public marketing
 * site, so images have to be fetchable by next/image, crawlers, and social
 * card scrapers. Serving them through presigned GETs would break all three.
 * Nothing private should ever be put in this bucket.
 */

export const UPLOAD_PREFIX = "media";
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB

/** Extension is taken from this map, never from the client's filename. */
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "application/pdf": "pdf",
};

export function isAllowedContentType(type: string): boolean {
  return Object.hasOwn(ALLOWED_TYPES, type);
}

export interface S3Config {
  bucket: string;
  region: string;
  endpoint?: string;
  publicBaseUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
}

/**
 * Returns null when storage is not configured, which lets the admin UI hide
 * the uploader and fall back to pasting a URL rather than crashing.
 */
export function getS3Config(): S3Config | null {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION ?? process.env.AWS_REGION;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  if (!bucket || !region || !accessKeyId || !secretAccessKey) return null;

  const endpoint = process.env.S3_ENDPOINT || undefined;
  const publicBaseUrl =
    process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, "") ??
    `https://${bucket}.s3.${region}.amazonaws.com`;

  return { bucket, region, endpoint, publicBaseUrl, accessKeyId, secretAccessKey };
}

export const hasStorage = getS3Config() !== null;

let cached: S3Client | null = null;

function getClient(config: S3Config): S3Client {
  if (!cached) {
    cached = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      // Required by R2 and most non-AWS S3 implementations.
      forcePathStyle: Boolean(config.endpoint),
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }
  return cached;
}

/** Server owned key. A client supplied path would allow overwriting anything. */
export function buildObjectKey(contentType: string): string {
  const extension = ALLOWED_TYPES[contentType];
  const now = new Date();
  const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  return `${UPLOAD_PREFIX}/${month}/${randomUUID()}.${extension}`;
}

export interface PresignedUpload {
  uploadUrl: string;
  publicUrl: string;
  key: string;
  expiresInSeconds: number;
}

export async function createPresignedUpload(
  contentType: string,
): Promise<PresignedUpload> {
  const config = getS3Config();
  if (!config) throw new Error("Object storage is not configured.");
  if (!isAllowedContentType(contentType)) {
    throw new Error(`Unsupported content type: ${contentType}`);
  }

  const key = buildObjectKey(contentType);
  const expiresInSeconds = 60;

  // ContentType is part of the signature: the browser cannot upload a
  // different type than the one that was authorised.
  const uploadUrl = await getSignedUrl(
    getClient(config),
    new PutObjectCommand({ Bucket: config.bucket, Key: key, ContentType: contentType }),
    { expiresIn: expiresInSeconds },
  );

  return {
    uploadUrl,
    publicUrl: `${config.publicBaseUrl}/${key}`,
    key,
    expiresInSeconds,
  };
}
