import React, { useEffect, useState, Suspense, useMemo, useTransition } from 'react'
import dynamic from 'next/dynamic'
import { isMobile, isTablet } from 'react-device-detect';
import { format } from '@lukeed/ms';
import { Sekeleton } from '@/components/Sekeleton'
import { Avatar } from '@/components/Avatar'
import TableOfContents from './TableOfContents'
import FunctionButton from './FunctionButton'
// import PropTypes from 'prop-types'
import styles from './Article.module.css'

const Preview = dynamic(() => import('@/components/Preview').then((mod) => mod.Preview))

function Article({ data }) {
    const [device, setDevice] = useState()
    const [tableOfContents, setTableOfContents] = useState([])
    const [isPending, startTransition] = useTransition();

    const createdDate = useMemo(() => {
        const diff = Date.now() - new Date(data.createdAt).getTime();
        if (diff < 1 * 60 * 1000) return 'Just now';
        return `${format(diff, true).replace('minutes', 'min')} ago`;
    }, [data.createdAt])

    const readTime = useMemo(() => {
        const time = Math.round(data.content.length / 800) * 60 * 1000;
        return format(time, true).replace('minutes', 'min');
    }, [data.content])

    useEffect(() => {
        setDevice(!isMobile && !isTablet)
        return () => {

        }
    }, [])

    return (
        <div className={styles.article}>
            <div className={styles.article_header}>
                <div className='flex justify-between mb-8'>
                    <div className='flex'>
                        <div className='mr-4'>
                            <Avatar />
                        </div>
                        <div>
                            <div className={styles.article_header__author_name}>{data.owner.fullname}</div>
                            <div className='flex items-center text-sm'>
                                <p>
                                    <span>{createdDate}</span>
                                </p>
                                <div className='px-2'>
                                    <span>·</span>
                                </div>
                                <div>
                                    <span>{readTime} read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FunctionButton />
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

