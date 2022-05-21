import { Article } from '@/components/Article'
import SEO from '@/components/SEO'
import Post from '@/models/Post'
// import User from '@/models/User'
export default function Blog({ data }) {
	return (
		<>
			<SEO
				title={data.title}
				siteTitle={'rabbitworld.ddns.net'}
				description={data.description}
				url={data.url}
				image={data.thumnail}
				createdAt={data.createdAt}
				updatedAt={data.updatedAt}
				tags={data.tags}
			/>
			<Article data={data} />
		</>
	)
}

export async function getServerSideProps(context) {
	// Fetch data from database
	try {
		let post = await Post.findOne({ slug: context.params.slug.substr(-6) })
			.populate({ path: 'owner' })
			.populate({ path: 'tags' })
			.exec()

		if (!post) {
			return {
				notFound: true
			}
		}

		post.views += 1
		post.save()

		const data = JSON.parse(JSON.stringify(post))

		return {
			props: { data } // will be passed to the page component as props
		}
	} catch (error) {
		console.log(error)
	}

	// const author = await User.findOne({ email: 'spman510@gmail.com' }).populate({ path: 'posts', select: 'title -_id -owner' }).exec()

	// console.log(author[0])
	// console.log(data.owner.fullname)
}
