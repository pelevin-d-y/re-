module.exports = {
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

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
