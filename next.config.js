/** @type {import('next').NextConfig} */
const path = require("path");
const globImporter = require("node-sass-glob-importer");
const cron = require("node-cron");


const date = new Date();
date.toDateString();
cron.schedule("6 18 * * *", function () {
  if (date.getDate() === 22) {

  } else {
    console.log("CronJob wurde erfolgreich auseführt!");
  }
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "components", "styles")],
    importer: globImporter()
  }
};

module.exports = nextConfig;
