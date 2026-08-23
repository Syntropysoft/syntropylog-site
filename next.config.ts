import type { NextConfig } from "next";

const IMMUTABLE = "public, max-age=31536000, immutable";

// Fija la raíz del proyecto: sin esto Turbopack la infiere y puede engancharse
// con un lockfile de algún directorio ancestro (típico: el home del usuario).
const root = import.meta.dirname;

const nextConfig: NextConfig = {
  turbopack: { root },
  async headers() {
    return ["/favicon.ico", "/beaconLog-2.png"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: IMMUTABLE }],
    }));
  },
};

export default nextConfig;
