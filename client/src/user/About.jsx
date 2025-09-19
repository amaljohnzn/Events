import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      {/* Header */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4">Event Management</h1>
          <p className="lead">
            Making event planning easier, more efficient, and stress-free.
          </p>
        </Col>
      </Row>

      {/* About Content */}
      <Row className="mb-4">
        <Col md={{ span: 10, offset: 1 }}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Welcome to Our Event Management Platform</h2>
              <p>
                We are dedicated to making event planning easier, more efficient, and stress-free.
                Our platform is designed to help organizers, participants, and vendors seamlessly
                manage events of all sizes.
              </p>
              <p>
                Whether you are hosting a small meeting, a large conference, or a wedding celebration,
                our solution provides the tools and resources you need to make your event a success.
              </p>

              <h3 className="mt-4">Our Mission</h3>
              <p>
                Our mission is to simplify event management by providing an intuitive platform
                that helps you organize every detail, from event creation to guest management, all in one place.
              </p>

              <h3 className="mt-4">Features</h3>
              <ul>
                <li>Customizable event pages</li>
                <li>Real-time registration tracking</li>
                <li>Vendor and venue management</li>
                <li>Payment and ticketing system integration</li>
                <li>And much more...</li>
              </ul>

              <h3 className="mt-4">Contact Us</h3>
              <p>
                If you have any questions or would like to learn more about how our platform
                can help you plan your next event, feel free to reach out!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
