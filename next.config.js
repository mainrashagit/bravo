module.exports = {
  reactStrictMode: true,

  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }
    return config
  },
  images: {
    loader: 'imgix',
    path: 'https://bravo.mainrasha.com/',
  },
  trailingSlash: true,
  i18n: {
    locales: ["en", "de", "ru"],
    defaultLocale: "en",
  }
}
