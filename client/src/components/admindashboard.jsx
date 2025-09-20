import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-5">Welcome to Admin Dashboard!</h1>
      <Row className="g-4 justify-content-center">
        {/* Create & Manage Events */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img 
              variant="top" 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" 
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Manage Events</Card.Title>
              <Card.Text>
                Create new events and manage existing events easily.
              </Card.Text>
              <Button 
                onClick={() => navigate('/createevents')} 
                variant="primary" 
                className="mb-2"
              >
                Create Event
              </Button>
              <Button 
                onClick={() => navigate('/EventList')} 
                variant="outline-primary"
              >
                View Events
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Ticket List */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img 
              variant="top" 
              src="data:image/jpeg;base64,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" 
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Ticket List</Card.Title>
              <Card.Text>
                View and manage all tickets booked for your events.
              </Card.Text>
              <Button 
                onClick={() => navigate('/ticketlist')} 
                variant="primary" 
              >
                View Tickets
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Manage Users */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img 
              variant="top" 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60" 
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Manage Users</Card.Title>
              <Card.Text>
                View, edit, or remove users registered in your system.
              </Card.Text>
              <Button 
                onClick={() => navigate('/userslist')} 
                variant="primary" 
              >
                View Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
