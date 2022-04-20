// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
// import "swiper/css/navigation";
export default ({ data }) => {
    return (
        <>
            <div className="h-[270px]">

                <Swiper
                    slidesPerView={4}
                    slidesPerGroup={4}
                    spaceBetween={20}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="line-clamp-2 truncate">
                            <div className="truncate">{data[0].title + " dasdasaaaaaaaaaaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                    <SwiperSlide>Slide 10</SwiperSlide>
                    <SwiperSlide>Slide 11</SwiperSlide>
                    <SwiperSlide>Slide 12</SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};