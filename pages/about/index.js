import Head from 'next/head'
// import Article from '@/components/Article'
import Comment from '@/components/Comment'
export default function Home() {
	return (
		<>
			<Head>
				<title>About</title>
				<meta name="description" content="Rabbit About Page" />
			</Head>
			{/* <Article /> */}
			<Comment />
		</>
	)
}
