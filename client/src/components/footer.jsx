import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>MyApp</h5>
            <p>&copy; 2025 MyApp. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <ul className="list-unstyled mb-0">
              <li><a href="#home" className="text-dark">Home</a></li>
              <li><a href="#about" className="text-dark">About</a></li>
              <li><a href="#contact" className="text-dark">Contact</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#f8f9fa', // light grey
  color: '#212529',            // dark text
  padding: '20px 0',
  borderTop: '1px solid #dee2e6',
  textAlign: 'left',
};

export default Footer;
