import React from 'react'
import {Container, Tab, Row, Col, Nav} from 'react-bootstrap'
import './Admin.css'
import MembersAdminPage from "../components/MembersAdminPage"
import DashboardAdminPage from "../components/DashboardAdminPage"
import LanguagesAdminPage from "../components/LanguagesAdminPage"


function Admin() {
  return <Container>
    <h2>Admin Page</h2>
    <Tab.Container defaultActiveKey="dashboard">
        <Row>
            <Col sm={3}>
            <Nav variant="pills" className="flex-column">
            <Nav.Item>
                    <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="members">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="languages">Languages</Nav.Link>
                </Nav.Item>
                
            </Nav>
            </Col>
            <Col sm={9}>
                <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                        <DashboardAdminPage />
                    </Tab.Pane>
                <Tab.Pane eventKey="members">
                    <MembersAdminPage />
                </Tab.Pane>
                <Tab.Pane eventKey="languages">
                    <LanguagesAdminPage />
                </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>
  </Container>
    
  
}

export default Admin