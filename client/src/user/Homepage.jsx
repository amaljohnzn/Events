import React from "react";
import { Container, Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <div style={{ position: "relative", textAlign: "center", color: "white" }}>
      {/* Hero Image */}
      <img
        src="https://res.cloudinary.com/dandjcp0x/image/upload/v1758257984/rachel-coyne-U7HLzMO4SIY-unsplash_ouiojo.jpg"
        alt="Event Hero"
        style={{
          width: "100%",
          height: "80vh",
          objectFit: "cover",
          filter: "brightness(60%)",
        }}
      />

      {/* Overlay Text */}
      <Container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="display-3 fw-bold">Welcome to Event Management</h1>
        <p className="lead">
          Making your events memorable and stress-free
        </p>
        <Button variant="primary" size="lg">
          Explore Events
        </Button>
      </Container>
    </div>
  );
};

export default Homepage;
