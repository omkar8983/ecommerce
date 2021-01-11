import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { submitBulkOrderDetails, submitOTP } from '../actions/bulkOrderActions';
import { Button, Modal, Form, Container } from 'react-bootstrap'
import Message from "./Message";
import Loader from './Loader';

const BulkOrderModal = (props) => {

    const userDetails = useSelector((state) => state.userLogin);
    const userName = userDetails.userInfo ? userDetails.userInfo.name : '';
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        props.setQtyHandler(1)
    }

    const [showLoader, setShowLoader] = useState(false);
    const [forSubmitSuccess, setForSubmitSuccess] = useState(false);
    const [name, setName] = useState(userName);
    const [cmpName, setCmpName] = useState('');
    const [city, setCity] = useState('');
    const [qty, setQty] = useState(props.qty);
    const [mobileNumber, setMobileNumber] = useState('');
    const [formError, setformError] = useState([]);

    const [isOtpForm, setIsOtpForm] = useState(false);
    const [enqId, setEnqId] = useState(0)
    const [otp, setOTP] = useState('');

    const submitHandler = (event) => {
        event.preventDefault()
        const formErrorList = [];
        if (name === '') {
            formErrorList.push(<Message variant="danger">Name can't be blank</Message>)
        }
        if (cmpName === '') {
            formErrorList.push(<Message variant="danger">Company Name can't be blank</Message>)
        }
        if (city === '') {
            formErrorList.push(<Message variant="danger">City can't be blank</Message>)
        }
        if (mobileNumber === '') {
            formErrorList.push(<Message variant="danger">Mobile Number can't be blank</Message>)
        } else if (mobileNumber.length != 10) {
            formErrorList.push(<Message variant="danger">Mobile Number should be of 10 digit's</Message>)
        }
        if (formErrorList.length) {
            setformError(...formErrorList)
        } else {
            setformError([])
            setShowLoader(true)
            const submitResult = submitBulkOrderDetails({ name, cmpName, city, mobileNumber, qty, product_id:props.product_id });
            submitResult.then(response => {
                setShowLoader(false)
                if (response) {
                    setIsOtpForm(true)
                    setEnqId(response)
                } else {
                    setformError([<Message variant="danger">Something went wrong...</Message>])
                }
            })
        }

    }
    const setNameHandler = (name) => {
        setName(name)
    }
    const setCmpNameHandler = (cmp_name) => {
        setCmpName(cmp_name)
    }
    const setCityHandler = city => {
        setCity(city)
    }
    const setQtyHandler = city => {
        setQty(city)
    }
    const setMobileNumberHandler = mobileNumber => {
        setMobileNumber(mobileNumber)
    }


    const submitOTPHandler = event => {
        event.preventDefault()
        if (otp === "") {
            setformError([<Message variant="danger">Please enter OTP</Message>])
        } else {
            setformError([])
            setShowLoader(true)
            const submitResult = submitOTP({ otp, enqId });
            submitResult.then(response => {
              setShowLoader(false)
                if (response) {
                    setForSubmitSuccess(true)
                } else {
                    setformError([<Message variant="danger">Invalid OTP</Message>])
                }
            })
        }

    }
    const setOTPHandler = otp => {
        setOTP(otp)
    }

    const showInquiryForm = () => {
        return (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setNameHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Company/shop name">
                    <Form.Label>Company/shop name</Form.Label>
                    <Form.Control
                        type="Company/shop name"
                        placeholder="Company/shop name"
                        value={cmpName}
                        onChange={(e) => setCmpNameHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCityHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Quantity"
                        value={qty}
                        onChange={(e) => setQtyHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="mobile_number">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumberHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                        </Button>
                <Button type="submit" variant="primary">
                    Submit Inquiry
                    </Button>
            </Form>
        )
    }
    const showOtpForm = () => {
        return (
            <Form onSubmit={submitOTPHandler}>
                <Form.Group controlId="otp">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOTPHandler(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Submit OTP
                </Button>
            </Form>
        )
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please fill the details</Modal.Title>
                </Modal.Header>
                <Container>
                    {formError}
                    {showLoader ? <Loader /> : forSubmitSuccess ? <Message variant="success">Thank you. We will contact you soon.</Message>  : !isOtpForm ? showInquiryForm() : showOtpForm()}
                </Container>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BulkOrderModal;
