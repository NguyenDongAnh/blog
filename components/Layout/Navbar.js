import React, { useCallback, useEffect, useState } from 'react'
import { osName, browserName } from 'react-device-detect';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import styles from './Navbar.module.css'
import classNames from 'classnames'
import useDeviceDetect from '@/hooks/useDeviceDetect';

const SearchBar = () => {
    const [fuzzySearchValues, setfuzzySearchValues] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const handleSearchChange = async (e, names) => {
        const { value } = e.currentTarget
        // Dynamically load fuse.js
        const Fuse = (await import('fuse.js')).default
        const options = {
            keys: ['author.tags.value']
        }
        const fuse = new Fuse(names, options)
        setSearchResults(fuse.search(value, { limit: 5 }))
    }

    useEffect(() => {
        setfuzzySearchValues(() => [
            {
                "title": "Hướng dẫn sử dụng react-markdown",
                "image": `/images/chandung.jpg`,
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
                "image": `/images/chandung.jpg`,
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
            <div className={styles.nav_search_el}>
                <input className={styles.nav_search__input} placeholder='Search' onChange={(e) => handleSearchChange(e, fuzzySearchValues)} />
                <span className={styles.nav_item__line}></span>
            </div>
            <div className="absolute top-[60px] text-white w-full max-w-[450px] mt-1">
                {searchResults.map((result) => {
                    // console.log(result)
                    return (
                        <Link href="/" key={result.refIndex}>
                            <a>
                                <div className='w-full flex p-2 bg-zinc-700 border-b'>
                                    <div className='mr-2 flex justify-center content-center min-w-[100px] max-w-[100px] max-h-[100px]'>
                                        <img
                                            src={result.item.image}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        {result.item.title}
                                        <div className='text-xs'>
                                            {/* {result.item.description} */}
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
    const isMobile = useDeviceDetect()
    const [isLeftSidebarActive, setIsLeftSidebarActive] = useState(false)

    const handleMenuButtonOnClick = (event) => {
        document.body.classList.toggle(styles.lock_scrollbar)
        setIsLeftSidebarActive((isLeftSidebarActive) => !isLeftSidebarActive)
    }

    return (
        <div className={styles.nav} role="navigation" aria-label="Primary Navigation">
            <div className={styles.nav_header}>
                {isMobile &&
                    <div className={styles.nav_menu__button} onClick={handleMenuButtonOnClick}>
                        <Icon icon="gg:menu" />
                    </div>}
                <Link href="/">
                    <a className={styles.nav_link}>
                        <div className='flex w-[120px]'>
                            <img
                                src={process.env.BASE_SERVER + "/images/logo.png"}
                                className="w-full"
                            />
                        </div>
                    </a>
                </Link>
            </div>
            <div className='flex'>
                <div className={classNames(styles.nav_main, isLeftSidebarActive ? styles.active : "")}>
                    {isMobile &&
                        <>
                            <div className="flex flex-row sm:h-auto h-16 p-1 justify-center">
                                <div className={styles.nav_link}>
                                    <div className={styles.nav_menu__button} onClick={handleMenuButtonOnClick}>
                                        <Icon icon="gg:menu" />
                                    </div>
                                    <Link href="/">
                                        <a className={styles.nav_link}>
                                            <div className='flex w-[120px]'>
                                                <img
                                                    src={process.env.BASE_SERVER + "/images/logo.png"}
                                                    className="w-[120px] h-[39px]"
                                                />
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </>}
                    <div className={styles.nav_item}>
                        <Link href="/">
                            <div className={styles.nav_link}>
                                <span className='my-auto'>HOME</span>
                                <span className={styles.nav_item__line}></span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.nav_item}>
                        <Link href="/post/Huong-dan-su-dung-react-markdown">
                            <div className={styles.nav_link}>
                                <span className='my-auto'>ABOUT</span>
                                <span className={styles.nav_item__line}></span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.nav_item}>
                        <Link href="/contact">
                            <div className={styles.nav_link}>
                                <span className='my-auto'>CONTACT</span>
                                <span className={styles.nav_item__line}></span>
                            </div>
                        </Link>
                    </div>
                </div>
                {isMobile && <div className={classNames(styles.overlay, isLeftSidebarActive ? styles.active : "")} onClick={handleMenuButtonOnClick}></div>}
                <SearchBar />
                <div className={styles.nav_social_media}>
                    <a href='https://www.facebook.com/bumerang.super.9' target={'_blank'} className={styles.nav_social_media__icon}>
                        <Icon icon="icon-park-outline:facebook-one" />
                    </a>
                    <a className={styles.nav_social_media__icon}>
                        <Icon icon="cib:instagram" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar