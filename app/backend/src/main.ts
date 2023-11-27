import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { setupServer } from "./infrastructure"
import { coreDataSource } from "./database/core/dataSource"

import * as dotenv from "dotenv"
dotenv.config()

async function bootstrap() {
  await coreDataSource.initialize()
  const app = await NestFactory.create(AppModule, { cors: true })
  await setupServer(app)

  const port = process.env.HTTP_PORT || 3000
  await app.listen(port)

  console.info(`App started -> http://localhost:${port}/`)
}

bootstrap()
