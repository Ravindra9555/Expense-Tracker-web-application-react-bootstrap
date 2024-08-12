import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MySwiper = () => { // Rename the component to avoid conflict
  return (
    <div>
      <Swiper
      
      spaceBetween={50}
      slidesPerView={1} // Show one slide at a time
      navigation // Enables next/prev buttons
      pagination={{ clickable: true }} // Enables pagination
      autoplay={{ delay: 300, disableOnInteraction: false }} // Autoplay with 3 seconds delay
      loop={true} // Loops the slides infinitely
      className='mySwiper'
    >
      <SwiperSlide>
        <img src="https://via.placeholder.com/800x400.png?text=Image+1" alt="Image 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/800x400.png?text=Image+2" alt="Image 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/800x400.png?text=Image+3" alt="Image 3" />
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default MySwiper;
