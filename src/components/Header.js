import React from "react";

import {Navbar, Container, Nav, NavDropdown, Row, Col} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import Button from "react-bootstrap/Button";
import {LoginState} from "../recoil/LoginState";
import {UserState} from "../recoil/UserState";
import axiosInstance from "../apis/axios";
import bag from "../assets/images/bag-heart.svg";
import person from "../assets/images/person.svg";

function Header() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

    const user = useRecoilValue(UserState);

    const handleSignInClick = () => {
        window.location.href = process.env.REACT_APP_HISNET_LOGIN_URL;
    };

    // 로그아웃 시도 시 로컬스토리지 값 지우고 메인화면으로 되돌림
    const handleLogout = async () => {
        localStorage.clear();
        setIsLoggedIn(false);

        await axiosInstance.get("/api/nanuri/auth/logout");

        navigate("/");
        window.location.reload();
    };

    if (window.location.pathname === "/signup") return null;
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-white border-bottom">
                <Container>

                    <Navbar.Brand href="/" className="text-primary">
                        NANURI
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav variant="underline" defaultActiveKey={pathname}>
                            <Nav.Link href="/items">나눔 목록</Nav.Link>
                            <NavDropdown title="나의 나눔">
                                <NavDropdown.Item href="/sharingList">나눔 중인 물건</NavDropdown.Item>
                                <NavDropdown.Item href="/givenSharing">나눔 완료</NavDropdown.Item>
                                <NavDropdown.Item href="/receivedSharing">받은 나눔</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/chat">채팅</Nav.Link>
                            <Nav.Link href="/ranking">나눔 랭킹</Nav.Link>
                            <Nav.Link href="/wish"
                                      className="d-xs-block d-sm-block d-md-block d-lg-none">관심목록</Nav.Link>
                            <Nav.Link href="/profile"
                                      className="d-xs-block d-sm-block d-md-block d-lg-none">마이페이지</Nav.Link>
                            {isLoggedIn
                                ?
                                <Button variant="outline-primary" className="d-xs-block d-sm-block d-md-block d-lg-none"
                                        onClick={handleLogout}>로그아웃</Button>
                                : <Button variant="outline-primary" className="d-xs-block d-sm-block d-md-block d-lg-none"
                                          onClick={handleSignInClick}>로그인</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>

                    <Nav className="d-none d-lg-block">
                        {/* 세션스토리지의 토큰 값이 유효하면 로그아웃 버튼, 유요하지 않으면 로그인 버튼 출력 */}
                        {isLoggedIn
                            ? <Container className="d-flex gap-4">
                                <Navbar.Text>
                                    <a href="/wish"><img src={bag} width="24"/></a>
                                </Navbar.Text>
                                <Navbar.Text> <a href="/profile"><img src={person} width="24"/></a></Navbar.Text>
                                <Button variant="outline-primary" onClick={handleLogout}>로그아웃</Button>
                            </Container>
                            : <Container>
                                <Button variant="outline-primary" onClick={handleSignInClick}>로그인</Button>
                            </Container>
                        }
                    </Nav>

                </Container>
            </Navbar>
        </>
    )
        ;
}

export default Header;