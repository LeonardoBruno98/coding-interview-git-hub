import { DataSource } from "typeorm"
import { config } from "dotenv"
import { PageView } from "./entities/pageview.entity"

config()

export const coreDataSource = new DataSource({
  name: "core",
  type: "postgres",
  host: "localhost",
  port: 5459,
  username: "wp-usr",
  password: "wp-pwd",
  database: "wp-core",
  synchronize: true,
  entities: [PageView],
  //migrations: ["src/database/core/migrations/**/*.ts"],
})
