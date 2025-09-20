import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col xs={6}>
            <small>© 2025 MyApp</small>
          </Col>
          <Col xs={6} className="text-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#home" className="text-dark small">Home</a>
              </li>
              <li className="list-inline-item">
                <a href="#about" className="text-dark small">About</a>
              </li>
              <li className="list-inline-item">
                <a href="#contact" className="text-dark small">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#f8f9fa',
  color: '#212529',
  padding: '8px 0',          // smaller height
  borderTop: '1px solid #dee2e6',
  fontSize: '0.85rem',       // smaller text
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
};

export default Footer;
