/**
 * Apply the media bucket's CORS rules.
 *
 * Usage:
 *   npm run storage:cors
 *
 * Reads storage config from .env.local (the same variables the app uses, so
 * `neon env pull --file .env.local` plus S3_BUCKET is enough). Without these
 * rules the browser refuses the direct upload and the uploader reports a
 * network error.
 *
 * Origins default to the production site and localhost. Override with a
 * comma separated MEDIA_CORS_ORIGINS.
 */
import { config } from "dotenv";

config({ path: ".env.local" });

import {
  S3Client,
  PutBucketCorsCommand,
  GetBucketCorsCommand,
} from "@aws-sdk/client-s3";
import { getS3Config } from "../src/lib/storage/s3";

const DEFAULT_ORIGINS = [
  "https://brollam.vercel.app",
  "http://localhost:3000",
];

async function main() {
  const s3 = getS3Config();
  if (!s3) {
    console.error(
      "Storage is not configured. Set S3_BUCKET plus the credentials\n" +
        "(S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY, or the AWS_* equivalents)\n" +
        "in .env.local. For Neon: `neon env pull --file .env.local`.",
    );
    process.exit(1);
  }

  const origins = (process.env.MEDIA_CORS_ORIGINS?.split(",") ?? DEFAULT_ORIGINS)
    .map((o) => o.trim())
    .filter(Boolean);

  const client = new S3Client({
    region: s3.region,
    endpoint: s3.endpoint,
    forcePathStyle: Boolean(s3.endpoint),
    credentials: {
      accessKeyId: s3.accessKeyId,
      secretAccessKey: s3.secretAccessKey,
    },
  });

  console.log(`Bucket   : ${s3.bucket}`);
  console.log(`Endpoint : ${s3.endpoint ?? "(AWS default)"}`);
  console.log(`Origins  : ${origins.join(", ")}\n`);

  await client.send(
    new PutBucketCorsCommand({
      Bucket: s3.bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: origins,
            // POST, not PUT: the uploader uses a presigned POST so that S3
            // enforces content-length-range.
            AllowedMethods: ["POST"],
            AllowedHeaders: ["content-type"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    }),
  );

  const applied = await client.send(new GetBucketCorsCommand({ Bucket: s3.bucket }));
  console.log("Applied CORS rules:");
  console.log(JSON.stringify(applied.CORSRules, null, 2));
}

main().catch((error) => {
  console.error("\nFailed to set CORS:", error instanceof Error ? error.message : error);
  process.exit(1);
});
