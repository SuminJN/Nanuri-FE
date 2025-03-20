import {Accordion, Breadcrumb, Col, Container, Row, Button} from "react-bootstrap";
import itemData from "../../assets/json/items.json";
import Card from "react-bootstrap/Card";
import img from "../../assets/images/items/shirt.jpeg";
import React, {useState} from "react";
import {Drawer} from "antd";
import {useNavigate} from "react-router-dom";

function SharingList() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Container className="my-5 col col-md-8 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h3" className="text-center">나눔 중인 물건</Card.Header>
                    {itemData.map((item, idx) => (
                        <Card.Body key={idx} className="border">

                            <Row>
                                <Col lg={3} className="mb-3">
                                    <Card.Img
                                        className="border rounded"
                                        variant="top"
                                        src={img} width={100}
                                        height={200}/>
                                </Col>
                                <Col xs={8} lg={6}>
                                    <Row>
                                        <Card.Title className="mb-3 fs-3">{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    </Row>
                                </Col>
                                <Col xs={4} lg={3}>
                                    <Button variant="outline-primary" onClick={showDrawer}>
                                        신청자 보기
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    ))}

                    <Drawer title="나눔 받기 신청자" onClose={onClose} open={open}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </Card>
            </Container>
        </>
    );
}

export default SharingList;