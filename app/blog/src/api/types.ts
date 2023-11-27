export type LocalizedPageProps<TParams = unknown> = {
  params: TParams & {
    lang: string
  }
}
