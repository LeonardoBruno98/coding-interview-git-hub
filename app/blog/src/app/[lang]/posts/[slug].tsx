import React, { useState } from "react"
import { createClient } from "next-sanity"
import { LocalizedPageProps } from "@/api/types"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import Navbar from "../../../components/NavBar"

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
        asset: { url: string }
      }
      mobile: {
        asset: { url: string }
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

interface PostPageProps {
  post: Post
  websiteSettings: WebsiteSettings
}

const PostPage: React.FC<PostPageProps> = ({ post, websiteSettings }) => {
  const router = useRouter()
  const slug = router.query.slug as string | undefined

  const [currentLanguage, setCurrentLanguage] = useState("it")

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
  }

  if (!slug) {
    ;<div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">
            Slug non fornito o invalido
          </h1>
        </div>
      </div>
    </div>
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Head>
        <title>{post.seoData?.metaTitle}</title>
        <meta name="description" content={post.seoData?.metaDescription} />
      </Head>
      <Navbar
        websiteTitle={websiteSettings.title}
        websiteLogoUrl={websiteSettings.logo.asset.url}
        currentLanguage={currentLanguage}
        languages={[
          { id: "en", title: "English" },
          { id: "it", title: "Italian" },
        ]}
        onChangeLanguage={handleLanguageChange}
      />
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow">
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
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 mt-4">
          {post.contents.title}
        </h1>
        <p className="text-gray-600">{post.contents.body}</p>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == 'post']{
      seoData {
        slug {
          current
        }
      }
    }
  `

  const posts: { seoData: { slug: { current: string } } }[] =
    await client.fetch(query)

  const paths = posts.map((post) => ({
    params: { slug: post.seoData?.slug?.current },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string | undefined

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const query = `
    *[_type == 'post' && seoData.slug.current == $slug][0]{
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

  const websiteSetting = `*[_type == "websiteSettings"][0]{
    logo {
      asset->{ url }
    },
    title,
    backgroundColor
  }`

  const post: Post = await client.fetch(query, { slug })
  const websiteSettings: WebsiteSettings = await client.fetch(websiteSetting)

  return {
    props: {
      post,
      websiteSettings,
    },
  }
}

export default PostPage
