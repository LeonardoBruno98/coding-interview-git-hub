import { NextRequest } from "next/server"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"

const locales = ["en", "it"]
const defaultLocale = "it"

function getLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language") as string,
  }
  const acceptedLanguages = new Negotiator({ headers }).languages()
  return match(acceptedLanguages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!_next|assets|plugins|favicon.ico).*)"],
}
