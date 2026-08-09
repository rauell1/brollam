# Media storage

The media library stores metadata and URLs. Binaries live in an S3 compatible
bucket and are uploaded straight from the browser using a short lived
presigned `POST`, so files never pass through a serverless function and the
4.5 MB request body limit does not apply.

Works with AWS S3 or any S3 compatible provider. **Neon Object Storage is the
recommended option here** — it lives in the same project as the database,
buckets branch alongside it, and it needs no AWS account. See
[Neon Object Storage](#neon-object-storage) below.

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `S3_BUCKET` | yes | Bucket name |
| `S3_REGION` | yes | Falls back to `AWS_REGION` |
| `S3_ACCESS_KEY_ID` | yes | Falls back to `AWS_ACCESS_KEY_ID` |
| `S3_SECRET_ACCESS_KEY` | yes | Falls back to `AWS_SECRET_ACCESS_KEY`. Mark sensitive in Vercel |
| `S3_ENDPOINT` | for non-AWS | Falls back to `AWS_ENDPOINT_URL_S3`. Enables path style addressing |
| `S3_PUBLIC_BASE_URL` | no | CDN origin. Defaults to the endpoint plus bucket (path style), or the AWS virtual host form |
| `NEXT_PUBLIC_IMAGE_HOSTS` | no | Extra comma separated hosts for `next/image` |

The `AWS_*` fallbacks exist so `neon env pull --file .env.local` output works
unmodified; only `S3_BUCKET` has to be added by hand.

## Neon Object Storage

Buckets are scoped to a branch and fork with it copy-on-write, so a preview
branch gets an isolated media library without duplicating anything.

1. **Create the bucket** in Console → branch → Storage, or
   `neon buckets create brollam-media --access-level public_read`.
   Set visibility to **Public** — the default is Private, which would break
   `next/image`, crawlers, and social card scrapers.
2. **Create a credential** under the branch's **Credentials** page with the
   `storage:write` scope. `token_id` is the access key ID and
   `s3_secret_access_key` is the secret; both are shown once only.
   Create it on the **production** branch: credentials are valid for that
   branch and every descendant, so previews are covered by the same one.
3. **Set the variables:**

```bash
S3_BUCKET=brollam-media
S3_REGION=us-east-2
S3_ENDPOINT=https://<branch-id>.storage.c-<N>.us-east-2.aws.neon.tech
S3_ACCESS_KEY_ID=nak_live_...
S3_SECRET_ACCESS_KEY=nsk_live_...
```

`S3_PUBLIC_BASE_URL` can be omitted: with an endpoint set, the public base is
derived as `<endpoint>/<bucket>`, which matches Neon's path style public URL
`https://<branch-id>.storage.c-<N>.us-east-2.aws.neon.tech/<bucket>/<key>`.

Neon Object Storage is in Beta. It supports browser form uploads (POST),
presigned requests, and `PutBucketCors`, which is everything this code needs.
Access level is set through the Console or Neon API — `PutBucketAcl` and
`PutBucketPolicy` return `501`, so the AWS bucket policy below does not apply.

Until `S3_BUCKET`, `S3_REGION`, and both credentials are present, `hasStorage`
is false: the uploader is hidden and the media form falls back to pasting a
URL. Nothing errors.

`next.config.ts` derives the `next/image` allowlist from these values, so the
bucket host is permitted automatically. Adding a CDN means setting
`S3_PUBLIC_BASE_URL` (or `NEXT_PUBLIC_IMAGE_HOSTS`) and redeploying — the
allowlist is evaluated at build time.

## Objects are public

This is a public marketing site. `next/image`, search crawlers, and social
card scrapers all fetch these URLs directly, so objects must be publicly
readable; presigned GETs would break all three.

**Nothing private belongs in this bucket.**

## CORS

Without this, uploads fail in the browser with a network error. Replace the
origins with your own before applying.

```json
[
  {
    "AllowedOrigins": [
      "https://brollam.vercel.app",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["POST"],
    "AllowedHeaders": ["content-type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

Apply with the bundled script, which reads the same config the app uses:

```bash
npm run storage:cors
```

Override the origins with a comma separated `MEDIA_CORS_ORIGINS`. The
equivalent by hand, if the AWS CLI is installed:

```bash
aws s3api put-bucket-cors --bucket brollam-media --endpoint-url "$S3_ENDPOINT" --cors-configuration file://cors.json
```

Only `POST` is needed. Reads are plain public GETs and never preflight.
Add your production domain here too once it is pointed at the site.

## Public read policy (AWS S3 only)

Not needed on Neon — set the bucket's access level to `public_read` instead.

Disable "Block all public access" for this bucket first, then:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadMedia",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::brollam-media/media/*"
    }
  ]
}
```

Scoped to the `media/` prefix, which is the only prefix the app writes to.

## IAM policy for the application (AWS S3 only)

On Neon the equivalent is a credential scoped to `storage:write`.

The app only ever signs uploads. It needs no read, list, or delete.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::brollam-media/media/*"
    }
  ]
}
```

## How the upload path is secured

- `POST /api/admin/media/upload-url` calls `getSession()` directly. The proxy
  matcher is `/admin/:path*` and does **not** cover `/api`, so this route
  cannot rely on it. A revoked session cannot mint a signature.
- The **server** builds the object key: `media/YYYY-MM/<uuid>.<ext>`, with the
  extension taken from a MIME allowlist rather than the client's filename.
  A client supplied path would allow overwriting arbitrary objects.
- `Content-Type` and `key` are pinned by the POST policy, so a signature
  issued for `image/png` cannot be used to upload HTML or to a different key.
- **Size is enforced by S3**, not by trusting the client. The policy carries
  `["content-length-range", 1, MAX_UPLOAD_BYTES]`, so the bucket itself
  rejects anything over 25 MB with `EntityTooLarge`. The route also rejects
  an oversized *declared* size early, purely to save a wasted round trip.
- Signatures expire after 60 seconds. Uploads are rate limited to 60 per
  admin per 10 minutes.

`POST` rather than `PUT` is deliberate: only the POST policy supports
`content-length-range`. A presigned PUT cannot cap actual bytes at all.

## Allowed types

`image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml`,
`video/mp4`, `video/webm`, `application/pdf`.

SVG is accepted because logos need it. SVGs can carry scripts, so they are
served from the bucket origin rather than the site origin, which keeps any
embedded script out of the site's origin. Only upload SVGs you trust.
