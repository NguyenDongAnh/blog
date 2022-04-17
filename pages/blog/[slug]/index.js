import { Layout } from '@/components/Layout'
import { Article } from '@/components/Article'
import SEO from '@/components/SEO'
import Post from '@/models/Post'
// import User from '@/models/User'
export default function Blog({ data }) {

  return (
    <Layout>
      <SEO
        title={data.title}
        siteTitle={"rabbitworld.ddns.net"}
        description={data.description}
        url={data.url}
        image={data.thumnail} />
      <Article data={data} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  let post = await Post.findOneAndUpdate({ slug: context.params.slug }).populate({
    path: 'owner'
  }).exec()

  const data = JSON.parse(JSON.stringify(post))

  // const author = await User.findOne({ email: 'spman510@gmail.com' }).populate({ path: 'posts', select: 'title -_id -owner' }).exec()

  // console.log(author[0])
  // console.log(data.owner.fullname)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }  // will be passed to the page component as props
  }
}
