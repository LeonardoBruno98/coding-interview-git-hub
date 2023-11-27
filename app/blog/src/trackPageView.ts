import { DefaultService } from "./api-client"

export const trackPageView = (title: string, url: string) => {
  const timestamp = Date.now()

  DefaultService.trackPageView({
    pageTitle: title,
    pageUrl: url,
    timestamp: timestamp,
  })
}
