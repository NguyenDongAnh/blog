import React, { useEffect, useState, Suspense, useMemo, useTransition } from 'react'
import TableOfContents from './TableOfContents'
import { Sekeleton } from '@/components/Sekeleton'
import { Avatar } from '@/components/Avatar'
import dynamic from 'next/dynamic'
// import PropTypes from 'prop-types'
import { isMobile, isTablet } from 'react-device-detect';
import { format } from '@lukeed/ms';
import styles from './Article.module.css'

const Preview = dynamic(() => import('@/components/Preview').then((mod) => mod.Preview))
// const TableOfContents = dynamic(() => import('./TableOfContents'))

// let renderCount = 0
function Article({ data }) {
    // console.log(++renderCount)
    const [device, setDevice] = useState()
    const [tableOfContents, setTableOfContents] = useState([])
    const [isPending, startTransition] = useTransition();
    const [createdDate, setCreatedDate] = useState();

    useEffect(() => {
        setDevice(!isMobile && !isTablet)

        return () => {

        }
    }, [])

    useEffect(() => {
        setCreatedDate(() => {
            const diff = Date.now() - new Date(data.createdAt).getTime();
            if (diff < 1 * 60 * 1000) return 'Just now';
            return `${format(diff, true)} ago`;
        })

        return () => {

        }
    }, [data.createdAt])

    return (
        <div className={styles.article}>
            <div className={styles.article_header}>
                <div className='flex mb-8'>
                    <div className='mr-4'>
                        <Avatar />
                    </div>
                    <div>
                        <div className={styles.article_header__author_name}>Nguyễn Đông Anh</div>
                        <div className='flex items-center text-sm'>
                            <p>
                                <span>{createdDate}</span>
                            </p>
                            <div className='px-2'>
                                <span>·</span>
                            </div>
                            <div>
                                <span>16 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className={styles.article_header__title}>{data.title}</h1>
            </div>
            <div className={styles.article_main}>
                <div className={styles.article_content}>
                    <Preview
                        content={data.content}
                        device={device}
                        setTableOfContents={setTableOfContents}
                        startTransition={startTransition}
                    />
                </div>
                {device && (
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
                            </div>
                        </Sekeleton>
                        <TableOfContents tableOfContents={tableOfContents} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Article

