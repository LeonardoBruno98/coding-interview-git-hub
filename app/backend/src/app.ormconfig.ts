import { DataSourceOptions } from "typeorm"

export const ormConnectionOptions = {
  core: (): DataSourceOptions => ({
    //name: "core",
    type: "postgres",
    host: "localhost",
    port: 5459,
    username: "wp-usr",
    password: "wp-pwd",
    database: "wp-core",
    synchronize: true,
    entities: ["dist/database/core/**/*.entity{.ts,.js}"],
    //migrations: ["dist/database/core/migrations/**/*.js"],
  }),
}
