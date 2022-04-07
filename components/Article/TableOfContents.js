import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './TableOfContents.module.css'
const TableOfContents = (props) => {
    const { contents } = props
    const [activeAnchorLink, setActiveAnchorLink] = useState({ prev: -1, next: 0 })

    const handleTableOfContentsWhenScroll = (anchorLinks) => {
        if (activeAnchorLink != undefined) {
            setActiveAnchorLink((item) => {
                if ((item.next) < anchorLinks.length && (anchorLinks[item.next].yPosition - window.scrollY) <= 16) {
                    return { prev: item.next, next: item.next + 1 }
                }
                else if ((item.prev - 1) >= 0 && (anchorLinks[item.prev].yPosition - window.scrollY) > 16) {
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
    })
    return (
        <div className={styles.article_sidebar}>
            <div className={styles.article_sidebar_header}>
                <div className={styles.article_sidebar_header__title}>
                    Nội Dung
                </div>
                <div className={styles.article_sidebar_main}>
                    <ul>
                        {contents.map((value, idx) => {
                            return (
                                <a href={`#${value.tagSlug}`} key={idx}>
                                    <li className={
                                        classNames(
                                            styles.article_sidebar_main__element,
                                            value.index === activeAnchorLink.prev ? styles.active : "",
                                            value.tagName === 'H1' ? "pl-3" : "",
                                            value.tagName === 'H2' ? "pl-6" : "",
                                            value.tagName === 'H3' ? "pl-9" : ""
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