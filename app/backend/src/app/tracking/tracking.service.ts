import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { PageView } from "../../database/core/entities/pageview.entity"

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(PageView)
    private pageViewRepository: Repository<PageView>
  ) {}

  async trackPageView(
    pageUrl: string,
    pageTitle: string,
    timestamp: number
  ): Promise<PageView> {
    const pageView = this.pageViewRepository.create({
      pageUrl,
      pageTitle,
      timestamp,
    })
    return await this.pageViewRepository.save(pageView)
  }
}
