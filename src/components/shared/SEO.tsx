import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  image: string
}

function SEO({ title, description, image }: SEOProps) {
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  )
}

export default SEO
