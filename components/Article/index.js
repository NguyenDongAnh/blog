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
    const { data } = props
    const [device, setDevice] = useState()
    const [tableOfContents, setTableOfContents] = useState([])
    const [isPending, startTransition] = useTransition();

    const getSlug = (hTag) => {
        return slugify(hTag.innerText, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true     // strip special characters except replacement, defaults to `false`
        })
    }

    useEffect(() => {
        if (device) {
            startTransition(() => {
                const hTags = document.querySelectorAll("h1, h2, h3");
                let headings = []
                hTags.forEach((hTag, index) => {
                    const tag = hTag.tagName
                    const title = hTag.innerText
                    const slug = getSlug(hTag) + `-${index}`
                    hTag.setAttribute("id", slug)
                    headings.push({
                        tag: tag,
                        title: title,
                        slug: slug,
                        top: hTag.offsetTop
                    })
                })
                setTableOfContents(() => headings)
            })
        }

        return () => {

        }
    }, [device])

    useEffect(() => {
        setDevice(!isMobile && !isTablet)
        return () => {

        }
    }, [])

    return (
        <div className={styles.article}>
            <div className={styles.article_main}>
                <div className={styles.article_content}>
                    <Preview content={data.content} />
                </div>
                {device ? (
                    <>
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
                        <TableOfContents tableOfContents={tableOfContents} />
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Article

