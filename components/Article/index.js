import React, { useEffect, useState, Suspense, useTransition } from 'react'
import Sekeleton from '@/components/Sekeleton'
import dynamic from 'next/dynamic'
// import PropTypes from 'prop-types'
import styles from './Article.module.css'
import slugify from 'slugify'
import { isMobile, isTablet } from 'react-device-detect';

const Preview = dynamic(() => import('@/components/Preview'))
const TableOfContents = dynamic(() => import('./TableOfContents'))

function Article(props) {

    const data = props.data
    const [tableOfContents, setTableOfContents] = useState([])
    const [isPending, startTransition] = useTransition();
    const [activeAnchorLinkOnload, setActiveAnchorLinkOnload] = useState()
    const getSlug = (hTag) => {
        return slugify(hTag.innerText, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true     // strip special characters except replacement, defaults to `false`
        })
    }

    useEffect(() => {
        if (!isMobile && !isTablet) {
            const hTags = document.querySelectorAll("h1, h2, h3");
            let anchorLinks = []
            hTags.forEach((hTag, index) => {
                const tagName = hTag.tagName
                const tagContent = hTag.innerText
                const tagSlug = getSlug(hTag) + `-${index}`
                hTag.setAttribute("id", tagSlug)
                anchorLinks.push({
                    index: index,
                    tagName: tagName,
                    tagContent: tagContent,
                    tagSlug: tagSlug,
                    yPosition: hTag.offsetTop
                })
            })
            setTableOfContents(() => anchorLinks)
        }

        return () => {

        }
    }, [])

    useEffect(() => {
        const handleOnload = () => {
            if (!isMobile && !isTablet) {
                startTransition(async () => {
                    const scrollPosition = window.scrollY
                    for (let i = 0; i < tableOfContents.length - 1; i++) {
                        if (tableOfContents[i].yPosition <= scrollPosition + 1 && tableOfContents[i + 1].yPosition - 16 >= scrollPosition) {
                            await setActiveAnchorLinkOnload(() => { return { prev: i, next: i + 1 } })
                            return;
                        }
                    }
                    return setActiveAnchorLinkOnload(() => { return { prev: -1, next: 0 } })
                })
            }
        }
        handleOnload()
        return () => {

        }
    }, [tableOfContents])

    return (
        <div className={styles.article}>
            <div className={styles.article_main}>
                <div className={styles.article_content}>
                    <Preview content={data.content} />
                </div>
                <Sekeleton isPending={isPending}>
                    <div className='w-full sticky max-h-[100vh] top-[96px]'>
                        <div className='pl-3'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-7'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-11'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-3'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-7'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-11'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-11'>
                            <Sekeleton.TextLine />
                        </div>
                        <div className='pl-11'>
                            <Sekeleton.TextLine />
                        </div>
                    </div>
                </Sekeleton>
                {activeAnchorLinkOnload ? <TableOfContents contents={tableOfContents} activeAnchorLinkOnload={activeAnchorLinkOnload} /> : null}
            </div>
        </div>
    )
}

export default Article

