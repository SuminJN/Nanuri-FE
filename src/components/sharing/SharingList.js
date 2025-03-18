import {Accordion, Breadcrumb, Col, Container, Row} from "react-bootstrap";
import itemData from "../../assets/json/items.json";
import Card from "react-bootstrap/Card";
import img from "../../assets/images/items/shirt.jpeg";
import React, {useState} from "react";
import {Drawer, Button} from "antd";
import {useNavigate} from "react-router-dom";

function SharingList() {
    const navigate = useNavigate();
    const onClickCard = (id) => alert(id);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Container className="my-5">
                <Card>
                    <Card.Header as="h3">나눔 중인 물건</Card.Header>
                    {itemData.map((item, idx) => (
                        <Card.Body key={idx}>
                            <Card.Title>{item.title}</Card.Title>
                            <Row>
                                <Col lg={2}><Card.Img variant="top" src={img} width={100} height={180}/></Col>

                                <Col lg={5}>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                </Col>
                                <Col lg={5}>
                                    <Button type="primary" onClick={showDrawer}>
                                        Open
                                    </Button>
                                </Col>
                            </Row>

                            <hr/>
                        </Card.Body>
                    ))}

                    <Drawer title="나눔 받기 희망자" onClose={onClose} open={open}>
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