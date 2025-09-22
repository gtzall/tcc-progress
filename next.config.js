/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Compressão
  compress: true,
  
  // Otimização de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Configuração para desenvolvimento
  allowedDevOrigins: [
    '3000-ia0m7sthft50ql9x4r9qk-c16446f3.manus.computer'
  ],
  
  // Webpack otimizações
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Otimizações para produção
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }
    return config
  },
  
  // Headers de cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

