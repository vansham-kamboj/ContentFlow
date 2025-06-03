
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude Node.js specific modules from client-side bundle.
      // These are often pulled in by server-side dependencies like OpenTelemetry (used by Genkit) or gRPC.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false, // For OpenTelemetry/Genkit
        http2: false, // For @grpc/grpc-js
        fs: false, // Commonly needed if other Node.js core modules are pulled in
        net: false, // For packages expecting Node.js network APIs
        tls: false, // For packages expecting Node.js TLS/SSL APIs
      };
    }
    return config;
  },
};

export default nextConfig;
