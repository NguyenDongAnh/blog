import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import TableOfContents from './TableOfContents'
import styles from './Article.module.css'
import slugify from 'slugify'
import Preview from '@/components/Preview'


function Article(props) {

    const data = props.data
    const [tableOfContents, setTableOfContents] = useState([])
    const getSlug = (hTag) => {
        return slugify(hTag.innerText, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true     // strip special characters except replacement, defaults to `false`
        })
    }

    useEffect(async () => {
        const hTags = document.querySelectorAll("h1, h2, h3");
        let anchorLinks = []
        await hTags.forEach((hTag, index) => {
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
        return () => {

        }

    }, [])


    return (
        <div className={styles.article}>
            <div className={styles.article_main}>
                <div className={styles.article_content}>
                    <Preview content={data.content} />
                </div>
                <TableOfContents contents={tableOfContents} />
            </div>
        </div>
    )
}

export default Article

