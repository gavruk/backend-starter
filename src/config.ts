export default () => ({
  db: {
    connectionString: process.env.CONNECTION_STRING,
  },
  appUrl: process.env.APP_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
});
