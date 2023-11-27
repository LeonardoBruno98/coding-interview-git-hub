import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { ormConnectionOptions } from "./app.ormconfig"

import { AppController } from "./app.controller"
import { AppModules } from "./app"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConnectionOptions.core()),
    ...AppModules,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
