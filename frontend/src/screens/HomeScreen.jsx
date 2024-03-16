import React, { useEffect } from "react";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/product/Product";
import Loader from "../components/Loader/Loader";
import Message from "../message/Message";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {Swiper,SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {EffectCoverflow,Pagination,Navigation} from 'swiper/modules';

import { categoryData } from "../categoryData/CategoryData";
import slide_image_1 from "../assets/images/1.jpg"
import slide_image_2 from "../assets/images/2.jpg"
import slide_image_3 from "../assets/images/3.jpg"
import slide_image_4 from "../assets/images/4.jpg"
import slide_image_5 from "../assets/images/5.jpg"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import first from "../assets/1.jpg";
import second from "../assets/2.jpg";
import third from "../assets/3.jpg";
import fourth from "../assets/4.jpg";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {

  const { data:products, isLoading, error } = useGetProductsQuery();


  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(data.products);
  //   }, 1000);
  // }, [data.products]);

  return (
    <>
      {/* homescreen banner slider */}
      <Carousel autoPlay={true} showIndicators={true} showStatus={false} showThumbs={false} interval={5000} transitionTime={1000} infiniteLoop={true} swipeable>

        <div>
          <img src={first} />
        </div>

        <div>
          <img src={second} />
        </div>

        <div>
          <img src={third} />
        </div>

        <div>
          <img src={fourth} />
        </div>



      </Carousel>

      {/* category cards */}
      <div className="cat-container">
      <h1 className="cat-heading">Categories</h1>
      <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={
        {
          rotate:0,
          stretch:0,
          depth:100,
          modifier:2.5,
        }
      }
      pagination={{el:'.swiper-pagination',clickable:true}}
      navigation={{nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev',
    clickable:true,
  }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
      >
       

       {/* mapping SwiperSlide here using categories array
       */}
       {
        categoryData.map((item,index) => {

          return (

        <SwiperSlide key={index} id={item.id}>
        <img src={item.categoryImage} alt="slide_image-1" onClick={() => navigate(`/category/${item.categoryName}`)} style={{cursor:"pointer"}}/>
       </SwiperSlide>

          )
        })
       }
       

      
      
      <div className="slider-controler">
      {/* left arrow */}
       <div className="swiper-button-prev slider-arrow">
      <FaArrowLeft color="black" size={'15px'}/>
       </div>

       {/* right arrow */}
       <div className="swiper-button-next slider-arrow">
        <FaArrowRight color="black"/>
       </div>

       {/* swiper pagination */}
       <div className="swiper-pagination">
       
       </div>

      </div>

      </Swiper>
      </div>

      {/* home screen product cards */}
      <div className="homepage-wrapper">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <h1
              style={{
                width: "100%",
                padding: "10px 20px",
                fontFamily: "sans-serif",
              }}
            >
              Latest Products
            </h1>
            <div className="home-wrapper">
              {products.map((product) => {
                return <Product product={product} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
