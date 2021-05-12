/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  cssModules: true,
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
  assetPrefix: '/rec/',
  basePath: '/rec',
  async exportPathMap() {
    const pathMap = {
      '/': { page: '/' },
      '/lists': { page: '/lists' },
    }

    const lists = Array.from(Array(5).keys())
    // eslint-disable-next-line array-callback-return
    lists.map((list) => {
      pathMap[`/lists/[id].tsx`] = {
        page: `/lists/1`,
        query: { slug: list },
      }
    })
    return pathMap
  },
})
