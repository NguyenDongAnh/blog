import Head from 'next/head'
import { Slider } from '@/components/Slider'
import Post from '@/models/Post'
import { Layout } from '@/components/Layout'
import styles from './Home.module.css'

export default function Home({ data }) {
  return (
    <Layout>
      <Head>
        <title>Bài viết</title>
        <meta name="description" content="Rabbit Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className='max-w-7xl w-full px-5'>
          <div className='text-2xl font-semibold capitalize mb-4'>Bài viết mới</div>
          <Slider data={data} />
          <div className='text-2xl font-semibold capitalize mb-4'>Các bài viết khác</div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from database
  try {
    let post = await Post.find().populate({
      path: 'owner'
    }).exec()

    const data = JSON.parse(JSON.stringify(post))
    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
      props: { data }  // will be passed to the page component as props
    }
  } catch (error) {
    console.log(error)
  }
}

