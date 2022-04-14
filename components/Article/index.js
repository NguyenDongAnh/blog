import React, { useEffect, useState, Suspense, useTransition } from 'react'
import Sekeleton from '@/components/Sekeleton'
import TableOfContents from './TableOfContents'
import dynamic from 'next/dynamic'
// import PropTypes from 'prop-types'
import styles from './Article.module.css'
import slugify from 'slugify'
import { isMobile, isTablet } from 'react-device-detect';

const Preview = dynamic(() => import('@/components/Preview'))
// const TableOfContents = dynamic(() => import('./TableOfContents'))

function Article(props) {
    const { data } = props
    const [device, setDevice] = useState()
    const [tableOfContents, setTableOfContents] = useState([])
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setDevice(!isMobile && !isTablet)

        return () => {

        }
    }, [])

    return (
        <div className={styles.article}>
            <div className='mx-auto mb-10 max-w-7xl px-4'>
                <div className='flex mb-8'>
                    <div className='mr-4'>
                        <div className="flex space-x-4">
                            <div>
                                <img src="/images/chandung.jpg" alt="" className='h-11 w-11 rounded-full' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='capitalize'>Nguyễn Đông Anh</div>
                        <div className='flex flex-wrap items-center text-sm'>
                            <p className='leading-5'>
                                <span>Apr 11</span>
                            </p>
                            <div className='inline-block px-2'>
                                <span className='leading-5'>·</span>
                            </div>
                            <div>
                                <span className='leading-5'>16 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='text-5xl font-bold flex flex-wrap'>{data.title}</h1>
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

