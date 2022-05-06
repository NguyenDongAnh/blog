import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import styles from './Navbar.module.css'
import classNames from 'classnames'
import useDetectSize from '@/hooks/useSizeDetect';

const SearchBar = () => {
    const [fuzzySearchValues, setfuzzySearchValues] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [openLogin, setOpenLogin] = useState()

    const handleSearchChange = async (e, names) => {
        const { value } = e.currentTarget
        // Dynamically load fuse.js
        const Fuse = (await import('fuse.js')).default
        const options = {
            keys: ['title']
        }
        const fuse = new Fuse(names, options)
        setSearchResults(fuse.search(value, { limit: 5 }))
    }
    useEffect(() => {
        setfuzzySearchValues(() => [
            {
                "title": "Hướng dẫn sử dụng react-markdown",
                "author": {
                    "name": "John Scalzi",
                    "tags": [
                        {
                            "value": "American"
                        }
                    ]
                }
            },
            {
                "title": "The Lock Artist",
                "author": {
                    "name": "Steve Hamilton",
                    "tags": [
                        {
                            "value": "English"
                        }
                    ]
                }
            }
        ])
        return () => {

        };
    }, []);

    return (
        <div className={styles.nav_search}>
            <div className={styles.nav_search__icon}>
                <Icon icon="codicon:search" />
            </div >
            <div className={styles.nav_search_item}>
                <input className={styles.nav_search_item__input} placeholder='Search' onChange={(e) => handleSearchChange(e, fuzzySearchValues)} />
                <span className={styles.nav_item__line}></span>
            </div>
            <div className={styles.nav_search_result}>
                {searchResults.map((result) => {
                    return (
                        <Link href="/" key={result.refIndex}>
                            <a href="/">
                                <div className={styles.nav_search_result_element}>
                                    <div>
                                        <div>
                                            {result.item.title}
                                        </div>
                                        <div className='text-xs'>
                                            {/* {result.item.description} */}
                                            abc123
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    )
                }
                )}
            </div>
        </div>
    )
}

const Navbar = () => {
    const { isSm } = useDetectSize()
    const [isLeftSidebarActive, setIsLeftSidebarActive] = useState(false)

    const handleMenuButtonOnClick = (event) => {
        document.body.classList.toggle('lock_scrollbar')
        setIsLeftSidebarActive((isLeftSidebarActive) => !isLeftSidebarActive)
    }

    return (
        <>

            <div className={styles.nav} role="navigation" aria-label="Primary Navigation">
                <div className={styles.nav_content}>
                    <div className={styles.nav_header}>
                        {isSm &&
                            <div className={styles.nav_menu__button} onClick={handleMenuButtonOnClick}>
                                <Icon icon="gg:menu" />
                            </div>}
                        <Link href="/">
                            <a className={styles.nav_link}>
                                <div className='flex w-[120px]'>
                                    <img
                                        src={"/images/logo.png"}
                                        className="w-full"
                                    />
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className='flex'>
                        <div className={classNames(styles.nav_main, isLeftSidebarActive ? classNames(styles.active, 'z-[101]') : null)}>
                            {isSm && (
                                <div className={styles.nav_link}>
                                    <div className={styles.nav_menu__button} onClick={handleMenuButtonOnClick}>
                                        <Icon icon="gg:menu" />
                                    </div>
                                    <Link href="/">
                                        <a className={styles.nav_link} href="/">
                                            <div className='flex w-[120px]'>
                                                <img
                                                    src={"/images/logo.png"}
                                                    className="w-[120px] h-[39px]"
                                                />
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            )}
                            <div className={styles.nav_item}>
                                <Link href="/">
                                    <a href="/" className={styles.nav_link}>
                                        <span className='my-auto'>BÀI VIẾT</span>
                                        <span className={styles.nav_item__line}></span>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.nav_item}>
                                <Link href="/blog/huong-dan-su-dung-react-markdown">
                                    <a href="/blog/huong-dan-su-dung-react-markdown" className={styles.nav_link}>
                                        <span className='my-auto'>SERIES</span>
                                        <span className={styles.nav_item__line}></span>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.nav_item}>
                                <Link href="/games">
                                    <a href="/games" className={styles.nav_link}>
                                        <span className='my-auto'>GAMES</span>
                                        <span className={styles.nav_item__line}></span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <SearchBar />
                        {isSm && <div className={classNames('overlay', isLeftSidebarActive ? 'active' : null)} onClick={handleMenuButtonOnClick}></div>}
                        <div className={styles.nav_footer}>
                            <div className={styles.nav_footer__icon}>
                                <Icon icon="fe:login" />
                            </div>
                            <span className='my-auto'>
                                ĐĂNG NHẬP
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar