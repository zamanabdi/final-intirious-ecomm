import React from 'react'
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/product/Product';
import Loader from '../components/Loader/Loader';
import Message from '../message/Message';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const CategoryScreen = () => {
  const { data:products, isLoading, error } = useGetProductsQuery();
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0,0)
   },[products.category]);


  return (
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
          Shop By Category
        </h1>
        <div className="home-wrapper">
          {products.filter((item) => {
            return(
              item.category === params.categoryName
            )
          }).map((product) => {
            return <Product product={product} />;
          })}
        </div>
      </>
    )}
  </div>
  )
}

export default CategoryScreen;
