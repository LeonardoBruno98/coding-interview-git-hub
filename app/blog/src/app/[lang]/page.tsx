"use client"
import React, { useState, useEffect } from "react"
import { LocalizedPageProps } from "@/api/types"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "next-sanity"
import Link from "next/link"
import Navbar from "../../components/NavBar"
import { trackPageView } from "../../trackPageView"

const client = createClient({
  projectId: "09n75ogr",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
})

interface Post {
  _id: string
  contents: {
    title: string
    body: string
    cover: {
      desktop: {
        asset: {
          url: string
        }
      }
      tablet: {
        asset: {
          url: string
        }
      }
      mobile: {
        asset: {
          url: string
        }
      }
    }
  }
  seoData: {
    metaTitle: string
    metaDescription: string
    slug: {
      current: string
    }
  }
}

interface WebsiteSettings {
  logo: {
    asset: {
      url: string
    }
  }
  title: string
  backgroundColor: string
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    logo: { asset: { url: "" } },
    title: "",
    backgroundColor: "",
  })
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState("it")

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `
        *[_type == 'post'] | order(publishedAt desc) [0...9]{
          _id,
          contents {
            title,
            body,
            cover {
              desktop {
                asset->{url}
              },
              tablet {
                asset->{url}
              },
              mobile {
                asset->{url}
              }
            }
          },
          seoData {
            metaTitle,
            metaDescription,
            slug {
              current
            }
          }
        }
      `
      const result: Post[] = await client.fetch(query)
      setPosts(result)
    }

    const fetchWebsiteSettings = async () => {
      const websiteSettingQuery = `*[_type == "websiteSettings"][0]{
        logo {
          asset->{ url }
        },
        title,
        backgroundColor
      }`

      const websiteSettingsResult: WebsiteSettings = await client.fetch(
        websiteSettingQuery
      )
      setWebsiteSettings(websiteSettingsResult)
    }

    fetchPosts()
    fetchWebsiteSettings()
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
  }
  const pathname = usePathname()

  useEffect(() => {
    trackPageView(document.title, window.location.href)
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Navbar
        websiteTitle={websiteSettings.title}
        websiteLogoUrl={websiteSettings.logo?.asset?.url}
        currentLanguage={currentLanguage}
        languages={[
          { id: "en", title: "English" },
          { id: "it", title: "Italian" },
          // Aggiungi altre lingue supportate secondo necessità
        ]}
        onChangeLanguage={handleLanguageChange}
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post.seoData?.slug?.current}`}>
            <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              <picture>
                <source
                  srcSet={post.contents.cover?.desktop?.asset?.url}
                  media="(min-width: 1024px)"
                />
                <source
                  srcSet={post.contents.cover?.tablet?.asset?.url}
                  media="(min-width: 640px)"
                />
                <img
                  src={post.contents.cover?.mobile?.asset?.url}
                  alt="Cover"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </picture>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  {post.contents.title}
                </h2>
                <p className="text-gray-600  max-w-full">
                  {post.contents.body.length > 100
                    ? `${post.contents.body.substring(0, 100)}...`
                    : post.contents.body}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
function trackpageView(title: string, href: string) {
  throw new Error("Function not implemented.")
}
