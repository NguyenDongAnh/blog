/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGFM from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon } from '@iconify/react'
import styles from './Preview.module.css'
import slugify from 'slugify'
import Children from 'react-children-utilities'

const Preview = props => {
	const { content, device, setTableOfContents, startTransition } = props
	const preview = useRef()

	const getSlug = hTag => {
		return slugify(hTag.innerText, {
			lower: true, // convert to lower case, defaults to `false`
			strict: true // strip special characters except replacement, defaults to `false`
		})
	}

	useEffect(() => {
		if (device) {
			startTransition(() => {
				const hTags = preview.current.querySelectorAll('h1, h2, h3')
				let headings = []
				const scrollPosition = window.scrollY
				hTags.forEach((hTag, index) => {
					const tag = hTag.tagName
					const title = hTag.innerText
					const slug = getSlug(hTag) + `-${index}`
					hTag.setAttribute('id', slug)
					headings.push({
						tag: tag,
						title: title,
						slug: slug,
						top: hTag.getBoundingClientRect().top + scrollPosition
					})
				})
				setTableOfContents(() => headings)
			})
		}

		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device])

	return (
		<div className={styles.preview} ref={preview}>
			<div className="markdown-body">
				<ReactMarkdown
					{...props}
					remarkPlugins={[remarkGFM, remarkMath]}
					rehypePlugins={[
						rehypeRaw,
						rehypeKatex,
						[rehypeHighlight, { ignoreMissing: true, subset: true }]
					]}
					// rehypePlugins={[rehypeRaw, rehypeKatex]}
					components={{
						code({ node, children, inline, className, ...props }) {
							if (!inline) {
								console.log(Children.onlyText(children))
								return (
									<>
										{children && (
											<CopyToClipboard
												text={Children.onlyText(
													children
												)}
											>
												<div
													className={styles.clipboard}
													onClick={e => {
														e.target.classList.add(
															styles.tooltipped
														)
														setTimeout(() => {
															e.target.classList.remove(
																styles.tooltipped
															)
														}, 2000)
													}}
												>
													<Icon icon="bx:bxs-copy" />
												</div>
											</CopyToClipboard>
										)}
										<code className={className} {...props}>
											{/* {parseReact(toHtml(tree))} */}
											{children}
										</code>
									</>
								)
							}
							return (
								<code className={className} {...props}>
									{children}
								</code>
							)
						}
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</div>
	)
}

export default Preview
