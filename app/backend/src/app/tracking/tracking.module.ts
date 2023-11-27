import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TrackingService } from "./tracking.service"
import { TrackingController } from "./tracking.controller"
import { PageView } from "../../database/core/entities/pageview.entity"

@Module({
  imports: [TypeOrmModule.forFeature([PageView])],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
