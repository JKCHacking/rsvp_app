"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function SwiperCarousel() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Pagination]}
        centeredSlides={true}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slideToClickedSlide={true}
        breakpoints={{
          1920: { slidesPerView: 4, spaceBetween: 30 },
          1028: { slidesPerView: 2, spaceBetween: 10 },
          990: { slidesPerView: 1, spaceBetween: 0 },
        }}
        className="centered-slide-carousel"
      >
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl flex justify-center items-center relative w-full h-[300px]">
          <Image
            src="/images/sample1.jpg"
            alt="Sample Image"
            fill
            style={{ objectFit: 'cover' }}
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 2</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 3</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 4</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 5</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">Slide 6</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
