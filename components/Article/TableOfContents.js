import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import styles from './TableOfContents.module.css'

const TableOfContents = (props) => {
    const { tableOfContents } = props
    const [activeAnchorLink, setActiveAnchorLink] = useState({ prev: -1, next: 0 })

    const handleScroll = (tableOfContents) => {
        if (activeAnchorLink != undefined) {
            const scrollPosition = window.scrollY
            setActiveAnchorLink((item) => {
                if ((item.next) < tableOfContents.length && (tableOfContents[item.next].top - scrollPosition) <= 116) {
                    return { prev: item.next, next: item.next + 1 }
                }
                else if ((item.prev - 1) >= 0 && (tableOfContents[item.prev].top - scrollPosition) > 116) {
                    return { prev: item.prev - 1, next: item.prev }
                }
                return item
            })
        }
    }

    const handleOnload = async () => {
        const scrollPosition = window.scrollY
        for (let i = 0; i < tableOfContents.length - 1; i++) {
            if (tableOfContents[i].top <= scrollPosition + 116 && tableOfContents[i + 1].top - 116 >= scrollPosition) {
                await setActiveAnchorLink(() => { return { prev: i, next: i + 1 } })
                return;
            }
        }
    }

    useEffect(() => {
        handleOnload()
        window.onscroll = () => handleScroll(tableOfContents)
        return () => {
        }

    }, [tableOfContents])

    return (
        <div className={styles.article_sidebar}>
            <div className={styles.article_sidebar_header}>
                <div className={styles.article_sidebar_main}>
                    <ul>
                        {tableOfContents.map((value, idx) => {
                            return (
                                <a href={`#${value.slug}`} key={idx} onClick={async () => {
                                    window.onscroll = null
                                    await setActiveAnchorLink({ prev: idx, next: idx + 1 })
                                    window.onscroll = () => handleScroll(tableOfContents)
                                }}>
                                    <li className={
                                        classNames(
                                            styles.article_sidebar_main__element,
                                            idx === activeAnchorLink?.prev ? styles.active : "",
                                            value.tag === 'H1' ? "pl-3" : "",
                                            value.tag === 'H2' ? "pl-7" : "",
                                            value.tag === 'H3' ? "pl-11" : ""
                                        )
                                    }>
                                        {value.title}
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