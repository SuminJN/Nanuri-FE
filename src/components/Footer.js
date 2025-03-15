import React from "react"
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Footer() {

    if (window.location.pathname === "/signup") return null;
    return (
        <>
            <div className="">
                <Container fluid>
                    <Row className="align-items-center g-0 border-top py-2 bg-white">
                        {/* Desc */}
                        <Col md={6} sm={12} className="text-center text-md-start text-black">
                            <span>© 2025 NANURI · HGU </span>
                        </Col>
                        {/* Links */}
                        <Col md={6} sm={12}>
                            <nav className="nav justify-content-center justify-content-md-end">
                                <Link className="text-black nav-link" to="#">
                                    팀소개
                                </Link>
                                <Link className="text-black nav-link" to="#">
                                    이용약관
                                </Link>
                                <Link className="text-black nav-link" to="#">
                                    개인정보처리방침
                                </Link>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Footer