# Media storage

The media library stores metadata and URLs. Binaries live in an S3 bucket
and are uploaded straight from the browser using a short lived presigned
`PUT`, so files never pass through a serverless function and the 4.5 MB
request body limit does not apply.

Bucket: `brollam-media` · Region: `eu-west-1`

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `S3_BUCKET` | yes | `brollam-media` |
| `S3_REGION` | yes | `eu-west-1` |
| `S3_ACCESS_KEY_ID` | yes | IAM user key, see policy below |
| `S3_SECRET_ACCESS_KEY` | yes | Mark sensitive in Vercel |
| `S3_ENDPOINT` | no | Only for non-AWS S3 (R2, Backblaze). Enables path style addressing |
| `S3_PUBLIC_BASE_URL` | no | CDN origin. Defaults to `https://brollam-media.s3.eu-west-1.amazonaws.com` |
| `NEXT_PUBLIC_IMAGE_HOSTS` | no | Extra comma separated hosts for `next/image` |

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

```bash
aws s3api put-bucket-cors --bucket brollam-media --cors-configuration file://cors.json
```

Only `POST` is needed. Reads are plain public GETs and never preflight.
Add your production domain here too once it is pointed at the site.

## Public read policy

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

## IAM policy for the application

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
