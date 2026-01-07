'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from "react";
import { getCookie } from '@/app/client_utility';
import { logout } from '@/app/server_actions'

function TopNavbar({authenticated}: any) {
  const [username, setUsername] = useState("");
  const [urlPath,  setUrlPath] = useState("");

  useEffect(()=>{
    setUsername(getCookie("user"));
    setUrlPath(window.location.pathname);
  });

  const handleClickLogoutBtn = async (e: any) => {
    e.preventDefault();
    console.log("Clicked logout button!");
    await logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/match-analysis">
          <Image src="moba_icon.png" className="me-1" roundedCircle style={{"height": "32px", "marginTop": "-5px"}} />
          <span>
            Moba AI Analysis Platform
          </span>
        </Navbar.Brand>
        { authenticated ?
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/match-analysis" active={urlPath=="/match-analysis"}>Match Analysis</Nav.Link>
            <Nav.Link href="/analysis-history" active={urlPath=="/analysis-history"}>Analysis History</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{"backgroundColor":"transparent", "border": "none"}}>
                <Image src="user_icon.png" roundedCircle style={{"height": "28px", "marginTop": "-4px"}} />
                <span>
                  { username }
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">User Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleClickLogoutBtn}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        </> : <></> }
      </Container>
    </Navbar>
  );
}

export default TopNavbar;