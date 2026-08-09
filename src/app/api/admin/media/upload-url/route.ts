import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session-store";
import { rateLimit } from "@/lib/rate-limit";
import {
  createPresignedUpload,
  isAllowedContentType,
  MAX_UPLOAD_BYTES,
  hasStorage,
} from "@/lib/storage/s3";

/**
 * Mints a short lived presigned PUT for the media library.
 *
 * An unguarded presign endpoint is an open write handle to the bucket, so
 * this is the one place that has to get authorisation right. The proxy's
 * matcher only covers /admin, not /api, so the session is verified here
 * directly rather than relied upon from upstream.
 */

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  if (!hasStorage) {
    return NextResponse.json(
      { error: "Object storage is not configured on this environment." },
      { status: 503 },
    );
  }

  // Signatures are cheap to mint and expensive to leak; cap per account.
  const bucket = rateLimit(`upload:${session.sub}`, 60, 10 * 60 * 1000);
  if (!bucket.allowed) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(bucket.retryAfterSeconds) } },
    );
  }

  let body: { contentType?: unknown; size?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const contentType = typeof body.contentType === "string" ? body.contentType : "";
  if (!isAllowedContentType(contentType)) {
    return NextResponse.json(
      { error: "That file type is not allowed." },
      { status: 415 },
    );
  }

  const size = typeof body.size === "number" ? body.size : 0;
  if (!Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "A valid file size is required." }, { status: 400 });
  }
  if (size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `Files must be ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB or smaller.` },
      { status: 413 },
    );
  }

  try {
    const presigned = await createPresignedUpload(contentType);
    return NextResponse.json(presigned, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[admin] presign failed", error);
    return NextResponse.json(
      { error: "Could not prepare the upload. Please try again." },
      { status: 500 },
    );
  }
}
