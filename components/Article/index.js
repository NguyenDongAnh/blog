import React, { useEffect, useState, Suspense, useTransition } from 'react'
import Sekeleton from '@/components/Sekeleton'
import TableOfContents from './TableOfContents'
import dynamic from 'next/dynamic'
// import PropTypes from 'prop-types'
import styles from './Article.module.css'
import { isMobile, isTablet } from 'react-device-detect';

const Preview = dynamic(() => import('@/components/Preview'))


let renderCount = 0
function Article(props) {
    console.log(++renderCount)
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

