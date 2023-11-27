import { INestApplication } from "@nestjs/common"
import { setupSwagger } from "./swagger/initialize"

export const setupServer = async (app: INestApplication) => {
  setupSwagger(app, {
    apiPath: "swagger",
    description: "Webpunks Blog App Api",
    title: "Webpunks Blog App Api",
    version: "1.0",
  })

  await app.init()
}
