import Button from "react-bootstrap/Button";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import img from "../assets/images/items/shirt.jpeg";
import {useNavigate} from "react-router-dom";
import {Card, ConfigProvider} from 'antd';
import search from "../assets/images/search.svg";
import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {Input, Radio} from 'antd';
import {mockCategory} from '../mocks/fixtures/mockCategory';

function Items() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [itemList, setItemList] = useState(null);
    const [radioValue, setRadioValue] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeCategory = (e) => {
        setRadioValue(e.target.value);
        axios.get("/api/items", {params: {categoryId: e.target.value}}).then(res => {
            setItemList(res.data);
        });
        setShow(false)
    };

    const onClickCard = (id) => {
        navigate(`/item/${id}`)
    };

    const goToAddItem = () => {
        navigate("/addItem");
    }

    useEffect(() => {
        axios.get("/api/items").then((res) => {
                setItemList(res.data);
            }
        )
    }, [])

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
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Radio: {
                                                /* here is your component tokens */
                                            },
                                        },
                                    }}
                                >
                                    <Radio.Group
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10,
                                            whiteSpace: "nowrap",
                                        }}
                                        onChange={onChangeCategory}
                                        value={radioValue}
                                        options={mockCategory}/>
                                </ConfigProvider>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" className="text-white" onClick={handleClose}>
                                    닫기
                                </Button>
                                {/*<Button variant="primary" onClick={handleClose}>*/}
                                {/*    적용하기*/}
                                {/*</Button>*/}
                            </Modal.Footer>
                        </Modal>
                    </Container>

                    <Col lg={3} xl={2} className="d-none d-lg-block p-5 mx-4 ">
                        <p className="fw-bold fs-5 pb-2" style={{whiteSpace: "nowrap"}}>카테고리</p>
                            <Radio.Group
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                    whiteSpace: "nowrap",
                                }}
                                onChange={onChangeCategory}
                                value={radioValue}
                                options={mockCategory}/>
                    </Col>

                    <Col>
                        <Row xs={2} sm={2} md={3} lg={3} xl={4} className="g-4">
                            {itemList !== null ? itemList.map((item, index) => (
                                <Col key={index}>
                                    <Card className="shadow-sm" onClick={() => onClickCard(item.id)}
                                          hoverable
                                          style={{
                                              height: 340,
                                          }}
                                          cover={<img alt="example"
                                                      src={item.photo} height={200}/>}
                                    >
                                        <p className="fs-5 mb-1">{item.title}</p>
                                        <p className="opacity-50">{item.ago}</p>
                                    </Card>
                                </Col>
                            )) : null}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Items;