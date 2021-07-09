/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  cssModules: true,
  async rewrites() {
    /// proxying to dev server
    return [
      {
        source: '/api/recommendations/:path*',
        destination:
          'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test/recommendations:path*', // Proxy to Backend
      },
      {
        source: '/api/client/:path*',
        destination:
          'https://7qq5n63vjg.execute-api.us-east-1.amazonaws.com/Test/client/:path*', // Proxy to Backend
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
  // assetPrefix: '/rec-mgt/',
  // basePath: '/rec-mgt',
})
