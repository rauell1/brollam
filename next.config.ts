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

  const publicBase = process.env.S3_PUBLIC_BASE_URL;
  if (publicBase) {
    try {
      hosts.add(new URL(publicBase).hostname);
    } catch {
      // A malformed value should not break the build; it just adds no host.
    }
  }

  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION ?? process.env.AWS_REGION;
  if (bucket && region) {
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
