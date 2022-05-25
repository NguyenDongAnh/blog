import React, { useEffect, useState, useTransition } from 'react'
import { Sekeleton } from '@/components/Sekeleton'
import classNames from 'classnames'
import styles from './TableOfContents.module.css'
import slugify from 'slugify'

const getSlug = hTag => {
	return slugify(hTag.innerText, {
		lower: true, // convert to lower case, defaults to `false`
		strict: true // strip special characters except replacement, defaults to `false`
	})
}

// let renderCount = 0

const TableOfContents = ({ preview, device }) => {
	// console.log(++renderCount)
	const [tableOfContents, setTableOfContents] = useState([])
	const [isPending, startTransition] = useTransition()
	const [activeAnchorLink, setActiveAnchorLink] = useState({
		prev: -1,
		next: 0
	})
	const handleScroll = tableOfContents => {
		if (activeAnchorLink != undefined) {
			const scrollPosition = window.scrollY
			setActiveAnchorLink(item => {
				if (
					item.next < tableOfContents.length &&
					tableOfContents[item.next].top - scrollPosition <= 116
				) {
					return { prev: item.next, next: item.next + 1 }
				} else if (
					item.prev - 1 >= 0 &&
					tableOfContents[item.prev].top - scrollPosition > 116
				) {
					return { prev: item.prev - 1, next: item.prev }
				}
				return item
			})
		}
	}

	const handleOnload = async () => {
		const scrollPosition = window.scrollY
		for (let i = 0; i < tableOfContents.length - 1; i++) {
			if (
				tableOfContents[i].top <= scrollPosition + 116 &&
				tableOfContents[i + 1].top - 116 >= scrollPosition
			) {
				setActiveAnchorLink({ prev: i, next: i + 1 })
				return
			}
		}
	}

	useEffect(() => {
		handleOnload()
		window.onscroll = () => handleScroll(tableOfContents)
		return () => {
			window.onscroll = null
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableOfContents])

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
		device && (
			<>
				<Sekeleton isPending={isPending}>
					<div className="w-full sticky max-h-[100vh] top-[96px]">
						<div className="pl-3">
							<Sekeleton.TextLine />
						</div>
						<div className="pl-7">
							<Sekeleton.TextLine />
						</div>
						<div className="pl-11">
							<Sekeleton.TextLine />
						</div>
						<div className="pl-3">
							<Sekeleton.TextLine />
						</div>
					</div>
				</Sekeleton>
				<div
					className={styles.article_sidebar}
					aria-label="Table of contents"
				>
					<div className={styles.article_sidebar_header}>
						<div className={styles.article_sidebar_main}>
							<ul>
								{tableOfContents.map((value, idx) => {
									return (
										<a
											href={`#${value.slug}`}
											key={idx + value.slug}
											onClick={() => {
												window.location.hash =
													value.slug
											}}
										>
											<li
												className={classNames(
													styles.article_sidebar_main__element,
													idx ===
														activeAnchorLink?.prev
														? styles.active
														: null,
													value.tag === 'H1'
														? 'pl-3'
														: null,
													value.tag === 'H2'
														? 'pl-7'
														: null,
													value.tag === 'H3'
														? 'pl-11'
														: null
												)}
											>
												{value.title}
											</li>
										</a>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</>
		)
	)
}

export default TableOfContents
