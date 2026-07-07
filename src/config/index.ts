
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path : path.join(process.cwd(), ".env")
});

export default {
  port : process.env.PORT || 5000,
  database_url : process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  api_url: process.env.API_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND!,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  ssl_store_id : process.env.SSL_STORE_ID,
  ssl_store_password : process.env.SSL_STORE_PASSWORD,
}