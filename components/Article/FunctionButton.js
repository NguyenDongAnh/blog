import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const FunctionButton = () => {
    const [isShare, setIsShare] = useState()
    const router = useRouter()

    return (
        <div className='grid grid-cols-4 gap-1 items-center text-2xl'>
            <a href="#">
                <Icon icon="akar-icons:link-chain" />
            </a>
            <a href="#">
                <Icon icon="carbon:bookmark-add" />
            </a>
            <div href="#" className='relative'>
                <a href="" onClick={(e) => {
                    e.preventDefault();
                    setIsShare(() => !isShare)
                }}>
                    <Icon icon="clarity:share-line" />
                </a>
                {isShare && (<div className='absolute flex p-2 rounded top-10 left-[50%] translate-x-[-50%] bg-gray-200 before:w-4 before:h-4 before:absolute before:top-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:bg-gray-200'>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://rabbitworld.ddns.net${router.asPath}`} className='mx-1' target="_blank">
                        <Icon icon="logos:facebook" />
                    </a>
                    <a href={`https://twitter.com/share?url=https://rabbitworld.ddns.net${router.asPath}`} className='twitter-share-button mx-1' data-show-count="false" target='_blank'>
                        <Icon icon="logos:twitter" width={24} height={24} />
                    </a>
                    {/* <a href="#" className='mx-1'>
                        <Icon icon="logos:linkedin-icon" />
                    </a> */}
                </div>)}
            </div>
        </div>
    )
}

export default FunctionButton