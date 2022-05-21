import { useState, useEffect } from 'react'
import Head from 'next/head'
import { NewestSlider } from '@/components/Slider'
import Post from '@/models/Post'
import styles from './Home.module.css'

export default function Home(props) {
	const { dataNewestPost } = props
	const [dataStoredPost, setDataStoredPost] = useState([])
	useEffect(() => {
		try {
			const storedPostList = JSON.parse(
				localStorage.getItem('storedPostList')
			)
			if (storedPostList) {
				const opts = {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ storedPostList: storedPostList })
				}
				fetch('/api/post/stored', opts)
					.then(response => response.json())
					.then(data => setDataStoredPost(() => data.post))
			}
		} catch (error) {
			console.log(error)
			localStorage.removeItem('storedPostList')
		}
		return () => {}
	}, [])
	return (
		<>
			<Head>
				<title>Bài viết</title>
				<meta name="description" content="Rabbit Home Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<div className="max-w-7xl w-full px-5">
					<div className="text-2xl font-semibold capitalize mb-4">
						Bài viết mới
					</div>
					<NewestSlider data={dataNewestPost} />
					<div className="text-2xl font-semibold capitalize mb-4">
						bài viết đã lưu
					</div>
					{/* <Suspense fallback={<div>Loading ...</div>}> */}
					{dataStoredPost.length ? (
						dataStoredPost.map((post, idx) => {
							return <div key={idx}>{post.title}</div>
						})
					) : (
						<div className="w-full flex justify-center items-center p-6 my-4 rounded border-2 border-gray-300">
							<span>Không có bài viết nào được lưu</span>
						</div>
					)}
					{/* </Suspense> */}
					<div className="text-2xl font-semibold capitalize mb-4">
						bài viết khác
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	// Fetch data from database
	try {
		const newestPost = await Post.find({ $orderby: { createdAt: -1 } })
			.populate({
				path: 'owner'
			})
			.limit(12)
			.exec()

		const dataNewestPost = JSON.parse(JSON.stringify(newestPost))

		return {
			// will be passed to the page component as props
			props: { dataNewestPost }
		}
	} catch (error) {
		console.log(error)
	}
}