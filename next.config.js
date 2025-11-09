/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Garantir que módulos Node.js não sejam incluídos no bundle do cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        cookie: false,
      }
    }
    // Ignorar diretório electron-app no build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/electron-app/**'],
    }
    return config
  },
  // Excluir electron-app do build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./electron-app/**/*'],
    },
  },
}

module.exports = nextConfig

