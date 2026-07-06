import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

async function main(){
  try {
    await prisma.$connect()
    console.log("DB CONNECTED");
    
    app.listen(config.port, () => {
      console.log(`server is running on port at http://localhost:${config.port}`);
      
    })
  } catch (error) {
      console.error(`Error starting the server`, error);
      prisma.$disconnect()
      process.exit(1)
  }
}

main();