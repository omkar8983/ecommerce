import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [sku, setSku] = useState("");
  const [popular, setPopular] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [faq, setFaq] = useState("");
  const [htup, setHTUP] = useState("");

  const editorRef = useRef();
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
    console.log(editorRef.current.editor.core);
    console.log(editorRef);
  }, [description]);
  const handleDescription = (content) => {
    setDescription(content);
  };

  const faqRef = useRef();
  const handleFaq = (content) => {
    setFaq(content);
  };

  const htupRef = useRef();
  const handleHTUP = (content) => {
    setHTUP(content);
  };

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setVideoLink(product.videoLink);
        setSku(product.sku);
        setPopular(product.popular);
        setRecommended(product.recommended);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setFaq(product.faq);
        setHTUP(product.htup);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("image", e.target.files[i]);
    }
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const onFAQChange = (e) => {
    console.log(e);
    console.log("----------");
    console.log(e.target.value);
    //setFaq(e)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        videoLink,
        sku,
        popular,
        recommended,
        category,
        description,
        faq,
        htup,
        countInStock,
      })
    );
  };

  return (
    <Container>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                multiple
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="videoLink">
              <Form.Label>Video Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video Link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="sku">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <p className="mb-2">Description</p>
            <SunEditor
              ref={editorRef}
              onChange={handleDescription}
              setContents={description}
            />
            <p className="mt-4 mb-2">FAQ</p>
            <SunEditor ref={faqRef} onChange={handleFaq} setContents={faq} />
            <p className="mt-4 mb-2">How to use Products</p>
            <SunEditor ref={htupRef} onChange={handleHTUP} setContents={htup} />
            <Form.Group as={Row} className="popular">
              <Form.Label as="legend" column sm={2}>
                Popular
              </Form.Label>
              <Form.Check
                inline
                value={true}
                type="radio"
                label="Yes"
                name="popular"
                id="popular1"
                onChange={(e) => setPopular(true)}
                checked={popular === true}
              />
              <Form.Check
                inline
                value={false}
                type="radio"
                label="No"
                name="popular"
                id="popular2"
                onChange={(e) => setPopular(false)}
                checked={popular === false}
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={3}>
                Recommended
              </Form.Label>
              <Form.Check
                inline
                value={true}
                type="radio"
                label="Yes"
                name="recommended"
                id="recommended1"
                onChange={(e) => setRecommended(true)}
                checked={recommended === true}
              />
              <Form.Check
                inline
                value={false}
                type="radio"
                label="No"
                name="recommended"
                id="recommended2"
                onChange={(e) => setRecommended(false)}
                checked={recommended === false}
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* 
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ProductEditScreen;
