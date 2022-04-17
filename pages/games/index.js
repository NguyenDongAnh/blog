import { useEffect, useRef } from 'react'
import { Layout } from '@/components/Layout'
import { Input } from '@/components/Input'
import Head from 'next/head'

export default function Home() {
  const inputRef = useRef(null)
  useEffect(() => {
    console.log(inputRef)
    return () => {

    }
  }, [])
  return (
    <Layout>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Rabbit Contact Page" />
      </Head>
      <Input ref={inputRef} />
    </Layout>
  )
}

