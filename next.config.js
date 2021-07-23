/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  cssModules: true,
  async rewrites() {
    /// proxying to dev server
    return [
      {
        source: '/api/aws1/:path*',
        destination:
          'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test/:path*', // Proxy to Backend
      },
      {
        source: '/api/aws2/:path*',
        destination:
          'https://3t8fpn6j0e.execute-api.us-east-1.amazonaws.com/Test/:path*', // Proxy to Backend
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: {
            extension: '.module.scss',
          },
        },
      ],
    })

    return config
  },
})
