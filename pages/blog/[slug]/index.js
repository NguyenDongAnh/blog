import { Layout } from '@/components/Layout'
// import dynamic from 'next/dynamic'
import Article from '@/components/Article'
import Comment from '@/components/Comment'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import Post from '@/models/Post'

// const Article = dynamic(() => import('@/components/Article'))

export default function Blog({ data }) {

  return (
    <Layout>
        <SEO title={data.title} siteTitle={"rabbitworld.ddns.net"} description={"Markdown là một cú pháp định dạng cho văn bản có thể được đọc bởi con người và có thể dễ dàng chuyển đổi sang HTML"} url={data.url} />
        <Article data={data} />
        <Comment />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  let post = await Post.findOne({ slug: context.params.slug }).exec()

  const data = JSON.parse(JSON.stringify(post))

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }  // will be passed to the page component as props
  }
}
