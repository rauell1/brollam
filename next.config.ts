import type { NextConfig } from "next";

/**
 * Hosts whose images next/image is allowed to fetch and optimise.
 *
 * A wildcard here turns the optimiser into an open proxy: anyone can point
 * /_next/image at any URL on the internet and spend our bandwidth on it.
 * The list is built from the storage configuration instead, with an env
 * escape hatch so a new CDN does not require a code change.
 */
function imageHosts(): string[] {
  const hosts = new Set<string>();

  // Must mirror getS3Config() in src/lib/storage/s3.ts. If these two drift,
  // uploads succeed but next/image refuses to serve what was uploaded.
  const add = (value: string) => {
    try {
      hosts.add(new URL(value).hostname);
    } catch {
      // A malformed value should not break the build; it just adds no host.
    }
  };

  const publicBase = process.env.S3_PUBLIC_BASE_URL;
  if (publicBase) add(publicBase);

  const endpoint = process.env.S3_ENDPOINT ?? process.env.AWS_ENDPOINT_URL_S3;
  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION ?? process.env.AWS_REGION;

  if (endpoint) {
    // Path style: the bucket is in the path, so the host is the endpoint's.
    add(endpoint);
  } else if (bucket && region) {
    hosts.add(`${bucket}.s3.${region}.amazonaws.com`);
  }

  // Comma separated, for CDNs or legacy assets hosted elsewhere.
  for (const extra of (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "").split(",")) {
    const host = extra.trim();
    if (host) hosts.add(host);
  }

  return [...hosts];
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: imageHosts().map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
