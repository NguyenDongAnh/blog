import Head from 'next/head'
import Article from '@/components/Article'
import Comment from '@/components/Comment'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

export default function Post({ data }) {

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content="Rabbit About Page" />
      </Head>
      <Article data={data} />
      <Comment />
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/post/${context.params.slug}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
