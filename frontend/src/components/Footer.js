import React from "react";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <footer className="footer px-4">
      <Container fluid>
        <Row>
          <Col lg={3} md={6} sm={12} className="mb-5">
            <h5>Company</h5>
            <IndexLinkContainer to="/about-us">
              <a>About Us</a>
            </IndexLinkContainer>
            <br />
            <IndexLinkContainer to="/blog">
              <a>Blog</a>
            </IndexLinkContainer>
            <br />
            <IndexLinkContainer to="/contact-us">
              <a>Contact Us</a>
            </IndexLinkContainer>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-5">
            <h5>Buying Guides</h5>
            <IndexLinkContainer to="/terms-and-condition">
              <a>Terms and Condition</a>
            </IndexLinkContainer>
            <br />
            <IndexLinkContainer to="/disclaimer">
              <a>Disclaimer</a>
            </IndexLinkContainer>
            <br />
            <IndexLinkContainer to="/privacy-policy">
              <a>Privacy Policy</a>
            </IndexLinkContainer>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-5">
            <h5>Connect with us</h5>
            <div className="connect">
              <a href="https://www.facebook.com/Turningpointnaturalcares">
                <i className="fab fa-facebook-square"></i>
              </a>{" "}
              <a href="https://www.instagram.com/turningpointnaturalcare/">
                <i className="fab fa-instagram-square"></i>
              </a>{" "}
              <a href="https://www.youtube.com/channel/UCLOMy8hqkhRIeL-nqP0T2ow">
                <i className="fab fa-youtube-square"></i>
              </a>{" "}
              <a href="https://api.whatsapp.com/send?phone=+919922000223">
                <i className="fab fa-whatsapp-square"></i>
              </a>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-5">
            <h5>News letter</h5>
            <p className="text-muted">
              Like us? Sneak a peek to our newsletters!
            </p>
            <Form id="footerNewsletter">
              <Form.Group>
                <Form.Control type="email" placeholder="Enter email" />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col className="text-center py-3">
            Payment Methods: <img src="/images/payments.png" />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Turning Point</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
