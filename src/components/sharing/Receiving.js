import {Button, Col, Container, Row} from "react-bootstrap";
import {mockItems} from "../../mocks/fixtures/mockItems";
import Card from "react-bootstrap/Card";
import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Receiving() {
    const navigate = useNavigate();

    const onClickCard = (id) => {
        navigate(`/item/${id}`)
    };

    const handleCancel = async (itemId) => {
        await axios.delete(`/api/history/${itemId}`).then(res => {
            alert("나눔 대기가 취소되었습니다.");
        })
        window.location.reload();
    }

    return (
        <>
            <Container className="mt-md-0 mt-lg-5 col-md-10 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">나눔 받기 대기 중</Card.Header>
                    {mockItems.map((item, idx) => (
                        <Card.Body key={idx}
                                   className="border"
                                   style={{cursor: "pointer"}}>

                            <Row className="m-3">
                                <Col xs={0} sm={0} md={3} lg={3} xl={4} onClick={() => onClickCard(item.id)}>
                                    <Card.Img
                                        variant="top"
                                        src={item.photo} width={100}
                                        height={200}/>
                                </Col>

                                <Col xs={0} sm={0} md={6} lg={6} xl={5} className="my-3 my-md-0" onClick={() => onClickCard(item.id)}>
                                    <Card.Title className="mb-3 fs-4">{item.title}</Card.Title>
                                    <Card.Text className="opacity-75">
                                        {item.ago}
                                    </Card.Text>
                                </Col>

                                <Col className="d-grid d-md-flex align-items-md-end justify-content-md-end">
                                    <Button variant="outline-danger"
                                            style={{whiteSpace: "nowrap"}}
                                            onClick={() => handleCancel(item.id)}
                                    >
                                        대기 취소
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    ))}
                </Card>
            </Container>
        </>
    );
}

export default Receiving;