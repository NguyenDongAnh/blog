import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import numeral from "numeral";

import useSizeDetect from "@/hooks/useSizeDetect";

export default ({ data }) => {
    const { isSm, isMd, isLg } = useSizeDetect()

    return (
        <div className="h-[200px]">
            <Swiper
                slidesPerView={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4}
                slidesPerGroup={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4}
                spaceBetween={20}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="newestSwiper"
            >
                {data.map((post, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <Link href={post.url}>
                                <a href={post.url} className='mb-2'>
                                    <div>
                                        <div className="line-clamp-2 text-xl">{post.title}</div>
                                    </div>
                                </a>
                            </Link>
                            <div className="flex flex-col">
                                <div className="text-blue-400">
                                    {post.owner.fullname}
                                </div>
                                <div className="text-sm">
                                    <span>
                                        8 min read
                                    </span>
                                </div>
                                <div className='flex text-zinc-400 mb-1'>
                                    <div className='flex items-center' aria-label='Number of views'>
                                        <Icon icon="carbon:view-filled" width="18" height="18" />
                                        <span className='ml-1 mr-2 text-sm'>{post.views}</span>
                                    </div>
                                    <div className='flex items-center' aria-label='Number of likes'>
                                        <Icon icon="bxs:like" width="18" height="18" />
                                        <span className='ml-1 mr-2 text-sm' >{numeral(120000).format('0.0a')}</span>
                                    </div>
                                    <div className='flex items-center' aria-label='Number of dislikes'>
                                        <Icon icon="bxs:dislike" width="18" height="18" />
                                        <span className='ml-1 mr-2 text-sm'>{numeral(1200).format('0.0a')}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
};