import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";

const ProductImageCarousel = (props) => {
  console.log(props);
  const [slides, setSlides] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  useEffect(() => {
    setSlides(props.slides);
    setVideoLink(props.videoLink);
  }, [props]);

  return (
    <Carousel className="product-image-carousel">
      {slides != undefined &&
        slides.length > 0 &&
        slides.map((slide) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:5000/${slide}`}
              alt={slide}
            />
          </Carousel.Item>
        ))}
      {videoLink != undefined && videoLink.length > 0 && (
        <Carousel.Item>
          <iframe width="100%" height="345" src={videoLink}></iframe>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default ProductImageCarousel;
