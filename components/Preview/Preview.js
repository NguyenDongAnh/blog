/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, forwardRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGFM from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon } from '@iconify/react'
import styles from './Preview.module.css'
import Children from 'react-children-utilities'

const Preview = forwardRef((props, ref) => {
	const { content } = props

	return (
		<div className={styles.preview} ref={ref}>
			<div className="markdown-body">
				<ReactMarkdown
					{...props}
					remarkPlugins={[remarkGFM, remarkMath]}
					rehypePlugins={[
						rehypeRaw,
						rehypeKatex,
						[rehypeHighlight, { ignoreMissing: true, subset: true }]
					]}
					components={{
						code({ node, children, inline, className, ...props }) {
							if (!inline) {
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
})

export default Preview
