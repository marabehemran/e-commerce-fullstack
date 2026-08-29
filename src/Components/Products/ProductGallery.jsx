import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function ProductGallery({ product }) {
  const images = [product.imageCover, ...(product.images || [])].filter(
    Boolean,
  );

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
              alt={`${product.title} ${index + 1}`}
              className="mx-auto h-[550px] w-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductGallery;
