module.exports = {
  // This is supposed to fix the issue with file changes
  // not being detected by nextjs inside of Docker containers
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};
