import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [typeOfCustomer, setTypeOfCustomer] = useState(0);
  const [aadhaar, setAadhaar] = useState("");
  const [company, setCompany] = useState("");
  const [gst, setGst] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          phone,
          gender,
          typeOfCustomer,
          aadhaar,
          company,
          gst
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Form.Check
            inline
            value="male"
            type="radio"
            label="Male"
            name="formradio2"
            id="radio1"
            onChange={(e) => setGender("male")}
            checked={gender === "male"}
          />
          <Form.Check
            inline
            value="female"
            type="radio"
            label="Female"
            name="formradio1"
            id="radio2"
            onChange={(e) => setGender("female")}
            checked={gender === "female"}
          />
        </Form.Group>
        <Form.Group controlId="typeOfCustomer">
          <Form.Label>Type of Customer</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(e) => setTypeOfCustomer(e.target.value)}
          >
            <option value="0">Regular</option>
            <option value="1">Vendor</option>
          </Form.Control>
        </Form.Group>
        {typeOfCustomer === "1" && (
          <>
            <Form.Group controlId="aadhaar">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Aadhaar"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
              ></Form.Control>
            </Form.Group>{" "}
            <Form.Group controlId="company">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              ></Form.Control>
            </Form.Group>{" "}
            <Form.Group controlId="gst">
              <Form.Label>GST No.</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="GST No."
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              ></Form.Control>
            </Form.Group>{" "}
          </>
        )}
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
