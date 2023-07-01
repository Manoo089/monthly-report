/** @type {import('next').NextConfig} */
const path = require("path");
const globImporter = require("node-sass-glob-importer");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "components", "styles")],
    importer: globImporter()
  }
};

module.exports = nextConfig;
