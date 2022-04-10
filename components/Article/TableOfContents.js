import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import styles from './TableOfContents.module.css'

let renderCount = 0
const TableOfContents = (props) => {
    renderCount = renderCount + 1
    console.log(renderCount)

    const { contents, activeAnchorLinkOnload } = props
    const [activeAnchorLink, setActiveAnchorLink] = useState(activeAnchorLinkOnload)

    const handleTableOfContentsWhenScroll = (contents) => {
        if (activeAnchorLink != undefined) {
            setActiveAnchorLink((item) => {
                if ((item.next) < contents.length && (contents[item.next].yPosition - window.scrollY) <= 16) {
                    return { prev: item.next, next: item.next + 1 }
                }
                else if ((item.prev - 1) >= 0 && (contents[item.prev].yPosition - window.scrollY) > 16) {
                    return { prev: item.prev - 1, next: item.prev }
                }
                return item
            })
        }
    }

    useEffect(() => {
        window.onscroll = () => handleTableOfContentsWhenScroll(contents)
        return () => {
            window.onscroll = null
        }
    }, [contents])

    return (
        <div className={styles.article_sidebar}>
            <div className={styles.article_sidebar_header}>
                <div className={styles.article_sidebar_main}>
                    <ul>
                        {contents.map((value, idx) => {
                            return (
                                <a href={`#${value.tagSlug}`} key={idx} onClick={async () => {
                                    window.onscroll = null
                                    console.log(activeAnchorLinkOnload)
                                    await setActiveAnchorLink({ prev: idx, next: idx + 1 })
                                    window.onscroll = () => handleTableOfContentsWhenScroll(contents)
                                }}>
                                    <li className={
                                        classNames(
                                            styles.article_sidebar_main__element,
                                            value.index === activeAnchorLink?.prev ? styles.active : "",
                                            value.tagName === 'H1' ? "pl-3" : "",
                                            value.tagName === 'H2' ? "pl-7" : "",
                                            value.tagName === 'H3' ? "pl-11" : ""
                                        )
                                    }>
                                        {value.tagContent}
                                    </li>
                                </a>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TableOfContents