require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(
        __dirname,
        './node_modules/apexcharts-clevision',
      ),
    };

    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
};
