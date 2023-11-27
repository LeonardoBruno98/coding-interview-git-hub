import { Controller, Get, Res } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"

@Controller()
export class AppController {
  @Get()
  index(@Res() res: any) {
    return res.redirect("swagger")
  }

  @Get("health")
  @ApiOperation({
    operationId: "healthCheck",
  })
  health() {
    return {
      healthy: true,
    }
  }
}
