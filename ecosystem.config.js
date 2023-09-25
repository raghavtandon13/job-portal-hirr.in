module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm run dev",
      env: {
        PORT: 3000,
      },
    },
    {
      name: "frontend",
      script: "serve -s build",
      env: {
        PORT: 5173,
      },
    },
  ],
};
