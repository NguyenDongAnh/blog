import { Layout } from '@/components/Layout'
import { Article } from '@/components/Article'
import SEO from '@/components/SEO'
import Post from '@/models/Post'

export default function Blog({ data }) {

  return (
    <Layout>
      <SEO title={data.title} siteTitle={"rabbitworld.ddns.net"} description={data.description} url={data.url} />
      <Article data={data} />
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
