module.exports = {
  apps: [
    {
      name: "kiwis-web",
      script: "./node_modules/.bin/next",
      args: "start",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
