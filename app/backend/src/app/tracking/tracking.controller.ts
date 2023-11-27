import { Body, Controller, Post } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { TrackingService } from "./tracking.service"
import { TrackPageViewRequest } from "./tracking.dto"

@Controller("v1/tracking")
export class TrackingController {
  constructor(private trackingService: TrackingService) {}
  @Post("trackPageView")
  @ApiOperation({
    operationId: "trackPageView",
  })
  async trackPageView(@Body() request: TrackPageViewRequest): Promise<void> {
    console.log("trackPageView", request)
    await this.trackingService.trackPageView(
      request.pageUrl,
      request.pageTitle,
      request.timestamp
    )
  }
}
