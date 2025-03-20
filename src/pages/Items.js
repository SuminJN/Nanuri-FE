import Button from "react-bootstrap/Button";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import img from "../assets/images/items/shirt.jpeg";
import {mockItems} from "../mocks/mockItems";
import {useNavigate} from "react-router-dom";
import {Card} from 'antd';
import search from "../assets/images/search.svg";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";

function Items() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClickCard = (id) => {
        navigate(`/item/${id}`)
    };

    const goToAddItem = () => {
        navigate("/addItem");
    }

    return (
        <>
            <Container className="my-5 col col-md-10 col-lg-10 col-xl-9">
                <Row>
                    <Col xs={1} sm={1} md={1} lg={1} xl={3}/>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text><img src={search}/></InputGroup.Text>
                            <Form.Control placeholder="검색어를 입력해주세요"/>
                        </InputGroup>
                    </Col>
                    <Col xs={4} sm={3} md={2} lg={2} xl={3}>
                        <Button variant="outline-primary" onClick={goToAddItem} style={{whiteSpace: "nowrap"}}>+
                            나눔하기</Button>
                    </Col>
                </Row>

                <Row className="mt-5">

                    <Container className="d-xs-block d-sm-block d-md-block d-lg-none">
                            <Button variant="outline-primary" className="px-4 mb-3" onClick={handleShow}>
                                필터
                            </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>카테고리</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    {['디지털기기', '생활가전', '문구', '가구/인테리어', '생활/주방', '도서', '의류', '뷰티/미용', '취미/게임', '티켓/교환권']
                                        .map((category, index) => (
                                            <div key={index} className="mb-3">
                                                <Form.Check
                                                    style={{whiteSpace: "nowrap"}} // 텍스트 줄바꿈 방지
                                                    type="radio"
                                                    name="category"
                                                    label={category}
                                                />
                                            </div>
                                        ))}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" className="text-white" onClick={handleClose}>
                                    닫기
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    적용하기
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>

                    <Col lg={3} xl={2} className="d-none d-lg-block p-5 mx-4">
                        <p className="fw-bold pb-2" style={{whiteSpace: "nowrap"}}>카테고리</p>
                        <Form>
                            {['디지털기기', '생활가전', '문구', '가구/인테리어', '생활/주방', '도서', '의류', '뷰티/미용', '취미/게임', '티켓/교환권']
                                .map((category, index) => (
                                    <div key={index} className="mb-3">
                                        <Form.Check
                                            style={{whiteSpace: "nowrap"}} // 텍스트 줄바꿈 방지
                                            type="radio"
                                            name="category"
                                            label={category}
                                        />
                                    </div>
                                ))}
                        </Form>
                    </Col>

                    <Col>
                        <Row xs={2} sm={2} md={3} lg={3} xl={4} className="g-4">
                            {mockItems.map((item, index) => (
                                <Col key={index}>
                                    <Card onClick={() => onClickCard(item.id)}
                                          hoverable
                                          style={{
                                              height: 340,
                                          }}
                                          cover={<img alt="example"
                                                      src={item.photo} height={200} />}
                                    >
                                        <p className="fs-5">{item.title}</p>
                                        <p>{item.ago}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Items;