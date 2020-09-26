// ENVIRONMENT VARIABLES are loaded in the server side.

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  // this will pass the env variable to the client side
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
    // AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    // AUTH0_CLIENT: process.env.AUTH0_CLIENT,
    // AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    // AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    // AUTHO_POST_LOGOUT_REDIRECT_URI: process.env.AUTHO_POST_LOGOUT_REDIRECT_URI,
    // AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
  },
};
