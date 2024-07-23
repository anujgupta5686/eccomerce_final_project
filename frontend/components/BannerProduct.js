import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const BannerProduct = () => {
  const desktopImages = [
    {
      id: 1,
      //   name: "BoAt Headphones",
      //   image: require("../assest/banner/img1.webp"),
      image: require("../assest/banner/b1.jpg"),
      //   content: "Engineering Headphones and Speakers ",
    },
    {
      id: 2,
      //   name: "Biggest Sale of the Coming Days",
      image: require("../assest/banner/b2.png"),
      //   content: "",
    },
    {
      id: 3,
      //   name: "Image 3",
      image: require("../assest/banner/b3.jpg"),
      //   content: "Content 3",
    },
    {
      id: 4,
      //   name: "Image 4",
      image: require("../assest/banner/b4.jpg"),
      //   content: "Content 4",
    },
    {
      id: 5,
      name: "Image 5",
      image: require("../assest/banner/b5.jpg"),
      content: "Content 5",
    },
    {
      id: 6,
      //   name: "Image 5",
      image: require("../assest/banner/b6.jpg"),
      //   content: "Content 5",
    },
    {
      id: 7,
      //   name: "Image 5",
      image: require("../assest/banner/b7.jpg"),
      //   content: "Content 5",
    },
  ];

  const mobileImages = [
    {
      id: 1,
      //   name: "Image 1 Mobile",
      image: require("../assest/banner/img1_mobile.jpg"),
      //   content: "Content 1",
    },
    {
      id: 2,
      //   name: "Image 2 Mobile",
      image: require("../assest/banner/img2_mobile.webp"),
      //   content: "Content 2",
    },
    {
      id: 3,
      //   name: "Image 3 Mobile",
      image: require("../assest/banner/img3_mobile.jpg"),
      //   content: "Content 3",
    },
    {
      id: 4,
      //   name: "Image 4 Mobile",
      image: require("../assest/banner/img4_mobile.jpg"),
      //   content: "Content 4",
    },
    {
      id: 5,
      //   name: "Image 5 Mobile",
      image: require("../assest/banner/img5_mobile.png"),
      //   content: "Content 5",
    },
    {
      id: 6,
      //   name: "Image 5 Mobile",
      image: require("../assest/banner/b6.jpg"),
      //   content: "Content 5",
    },
    {
      id: 7,
      //   name: "Image 5 Mobile",
      image: require("../assest/banner/b7.jpg"),
      //   content: "Content 5",
    },
  ];

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-96 w-full bg-slate-200 relative">
        {/* Desktop and Tablet Version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Scrollbar, A11y, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 2000 }}
            loop={true}
            className="mySwiper"
          >
            {desktopImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="w-full mx-auto shadow-lg h-full flex items-center justify-center bg-contain  bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className=" text-white h-full w-full flex flex-col justify-end items-start p-4">
                    <h2 className="text-2xl md:text-4xl">{item.name}</h2>
                    <p className="text-sm md:text-lg">{item.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 2000 }}
            loop={true}
            className="mySwiper"
          >
            {mobileImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="w-full mx-auto shadow-lg h-full flex items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="  text-white h-full w-full flex flex-col justify-end items-start p-4">
                    <h2 className="text-2xl md:text-4xl">{item.name}</h2>
                    <p className="text-sm md:text-lg">{item.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
