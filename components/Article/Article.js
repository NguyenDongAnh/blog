/* eslint-disable no-unused-vars */
import React, {
	useEffect,
	useState,
	useRef,
	useMemo
} from 'react'
import { Icon } from '@iconify/react'
import { isMobile, isTablet } from 'react-device-detect'
import dynamic from 'next/dynamic'
import { format } from '@lukeed/ms'
import numeral from 'numeral'
import { Avatar } from '@/components/Avatar'
import TableOfContents from './TableOfContents'
import Preview from '@/components/Preview'
import FunctionButton from './FunctionButton'
// import PropTypes from 'prop-types'
import styles from './Article.module.css'

function Article({ data }) {
	const [device, setDevice] = useState()
	const preview = useRef()

	const createdDate = useMemo(() => {
		const diff = Date.now() - new Date(data.createdAt).getTime()
		if (diff < 1 * 60 * 1000) return 'Just now'
		return `${format(diff, true).replace('minutes', 'min')} ago`
	}, [data.createdAt])

	const readTime = useMemo(() => {
		return format(data.time_reading, true).replace('minutes', 'min')
	}, [data.time_reading])

	useEffect(() => {
		setDevice(!isMobile && !isTablet)

		return () => {}
	}, [])

	return (
		<div className={styles.article}>
			<div className={styles.article_header}>
				<div className="flex justify-between mb-8">
					<div className="flex">
						<div className="mr-4">
							<Avatar />
						</div>
						<div>
							<div className={styles.article_header__author_name}>
								{data.owner.fullname}
							</div>
							<div className={styles.article_header__time_detail}>
								<p>
									<span>{createdDate}</span>
								</p>
								<div className="px-2">
									<span>·</span>
								</div>
								<div>
									<span>{readTime} read</span>
								</div>
							</div>
						</div>
					</div>
					<FunctionButton />
				</div>
				<div className="flex text-zinc-400 mb-1">
					<div
						className="flex items-center"
						aria-label="Number of views"
					>
						<Icon
							icon="carbon:view-filled"
							width="18"
							height="18"
						/>
						<span className="ml-1 mr-2 text-sm">{data.views}</span>
					</div>
					<div
						className="flex items-center"
						aria-label="Number of likes"
					>
						<Icon icon="bxs:like" width="18" height="18" />
						<span className="ml-1 mr-2 text-sm">
							{numeral(120000).format('0.0a')}
						</span>
					</div>
					<div
						className="flex items-center"
						aria-label="Number of dislikes"
					>
						<Icon icon="bxs:dislike" width="18" height="18" />
						<span className="ml-1 mr-2 text-sm">
							{numeral(1200).format('0.0a')}
						</span>
					</div>
				</div>
				<h1 className={styles.article_header__title}>{data.title}</h1>
			</div>
			<div className={styles.article_main}>
				<div className={styles.article_content}>
					<Preview
						content={data.content}
						device={device}
						ref={preview}
					/>
				</div>
				<TableOfContents
					preview={preview}
					device={device}
				/>
			</div>
			<div className="mx-auto mb-10 max-w-7xl px-4 my-10">
				<span className="text-xl font-semibold mr-2">Tags :</span>
				{data.tags.map(tag => {
					return (
						<div
							className="inline-block py-1 px-3 ml-2 bg-gray-500 rounded text-white text-[14px]"
							key={tag.slug}
						>
							{tag.name_tag}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Article
