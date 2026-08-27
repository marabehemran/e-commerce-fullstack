import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import mobile from "../../images/mobile.png";
import mobile1 from "../../images/mobile1.png";
import mobile2 from "../../images/mobile2.png";

function ProductGallery() {
  const images = [mobile, mobile1, mobile2];

  return (
    <div className="bg-white/90 dark:bg-slate-800 rounded-3xl">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="w-full max-w-md"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="mx-auto h-[550px] w-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ProductGallery;
