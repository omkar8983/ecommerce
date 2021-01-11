import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const [popular, setPopular] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (productList.products && productList.products.length > 0) {
      const _popular = productList.products.filter((p) => {
        return p.popular === true;
      });
      const _recommended = productList.products.filter((p) => {
        return p.recommended === true;
      });
      const _newArrivals = productList.products.slice(0, 4);

      setNewArrivals(_newArrivals);
      setPopular(_popular.slice(0, 4));
      setRecommended(_recommended.slice(0, 4));
    }
  }, [productList]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <div className="about-us-section">
        <h1 className="pt-5">About Us</h1>
        <p>Company establishment year 2015</p>
        <p>
          Company started with 2 new entrepreneurs Mr Sunil ( mechanical
          Engineer)& Priyanka Gaikwad( Computer engineer) , business started
          with our interest in farming industry which needs a technical support
          from the new age engineers to resolve their daily routine problems in
          farming ,with the proper analysis & market supply needs we developed a
          optimum well priced good quality products which stand with good
          reputation in market in few years, company participate in KISAN
          Exhibitions & Local exhibitions for improve the awareness of farmers
          to produce vegetables without harmful chemicals & insecticides.
        </p>
      </div>
      <Container>
        <h1 className="mt-5 mb-0 pb-0">New Arrivals</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {newArrivals.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            /> */}
          </>
        )}
        <h1 className="mt-5 mb-0 pb-0">Popular Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {popular.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            /> */}
          </>
        )}
        <h1 className="mt-5 mb-0 pb-0">Recommended Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {recommended.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            /> */}
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
