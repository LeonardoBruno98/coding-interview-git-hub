import { ApiProperty } from "@nestjs/swagger"

export class TrackPageViewRequest {
  @ApiProperty()
  pageUrl: string

  @ApiProperty()
  pageTitle: string

  @ApiProperty()
  timestamp: number
}
