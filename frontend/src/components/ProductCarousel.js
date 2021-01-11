import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark home-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/1.jpeg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/2.jpeg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/3.jpeg"
          alt="Three slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/4.jpeg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/5.jpeg"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/uploads/banner/6.jpeg"
          alt="Sixth slide"
        />
      </Carousel.Item>
    </Carousel>
  );

  // return loading ? (
  //   <Loader />
  // ) : error ? (
  //   <Message variant="danger">{error}</Message>
  // ) : (
  //   <Carousel pause="hover" className="bg-dark home-carousel">
  //     {products.map((product) => (
  //       <Carousel.Item key={product._id}>
  //         <Link to={`/product/${product._id}`}>
  //           <Image src={product.image} alt={product.name} fluid />
  //           <Carousel.Caption className="carousel-caption">
  //             <h2>
  //               {product.name} (${product.price})
  //             </h2>
  //           </Carousel.Caption>
  //         </Link>
  //       </Carousel.Item>
  //     ))}
  //   </Carousel>
  // );
};

export default ProductCarousel;
