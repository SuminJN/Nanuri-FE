import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import {useRecoilState, useRecoilValue} from "recoil";
import {UserState} from "../recoil/UserState";
import {useState} from "react";
import {LoginState} from "../recoil/LoginState";
import axiosInstance from "../apis/axios";

function Signup() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const [userState, setUserState] = useRecoilState(UserState);

    const userInfo = useRecoilValue(UserState);
    const [nickname, setNickname] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleNickname = (e) => setNickname(e.target.value);

    const handleIsChecked = () => setIsChecked(!isChecked);

    // 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 폼 제출 함수
    const onSubmit = (event) => {
        event.preventDefault();

        if (nickname.length < 3) {
            alert("3글자 이상의 닉네임을 입력해주세요");
            return;
        } else if (!isChecked) {
            alert("개인정보 수집 및 이용에 동의해주세요")
            return;
        }

        axiosInstance.post("/api/nanuri/auth/signup", {uniqueId: userInfo.uniqueId, nickname: nickname});

        setUserState({...userState, nickname: nickname})
        setIsLoggedIn(true);
        window.location.href = "/";
    };

    return (
        <div>
            <Container fluid className="w-25 mt-5 bg-body-tertiary shadow p-3 mb-5 bg-body rounded">
                <h1 className="text-primary my-4 d-flex justify-content-center">NANURI</h1>
                <h3 className="d-flex justify-content-center">회원가입</h3>
                <Form className="mx-5 p-4" onSubmit={onSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="uniqueId" column="sm">ID</Form.Label>
                        <Form.Control type="text" id="uniqueId" value={userInfo.uniqueId} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="name" column="sm">이름</Form.Label>
                        <Form.Control type="text" id="name" value={userInfo.name} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="department" column="sm">학부</Form.Label>
                        <Form.Control type="text" id="department" value={userInfo.department} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Label htmlFor="nickname" column="sm">닉네임</Form.Label>
                        <Form.Control type="text" id="nickname" value={nickname} onChange={handleNickname}/>
                    </Form.Group>

                    <Row>
                        <Col md={8}>
                            <Form.Check type="checkbox" id="policy"
                                        label="개인정보 수집 및 이용 동의" checked={isChecked} onChange={handleIsChecked}/>
                        </Col>
                        <Col md={4}>
                            <Button variant="outline-primary" onClick={handleShow}>
                                자세히
                            </Button>
                        </Col>
                    </Row>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>개인정보 수집 및 이용 동의</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <ul>
                                    <li>수집 및 이용 목적</li>
                                    <br/>
                                    <li>수집 항목</li>
                                    <br/>
                                    <li>보유 및 이용 기간</li>
                                </ul>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    <Row>
                        <Button type="submit" className="my-2">
                            Submit
                        </Button>
                    </Row>
                </Form>

            </Container>
        </div>
    );

}

export default Signup;