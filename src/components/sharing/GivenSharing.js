import {Col, Container, Row} from "react-bootstrap";
import {mockItems} from "../../mocks/mockItems";
import Card from "react-bootstrap/Card";
import React from "react";

function SharingList() {

    return (
        <>
            <Container className="mt-md-0 mt-lg-5 col-md-10 col-lg-10 col-xl-8">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">나눔 중인 물건</Card.Header>
                    {mockItems.map((item, idx) => (
                        <Card.Body key={idx} className="border">

                            <Row className="m-3">
                                <Col xs={0} sm={0} md={3} lg={3} xl={3}>
                                    <Card.Img
                                        className=""
                                        variant="top"
                                        src={item.photo} width={100}
                                        height={200}/>
                                </Col>

                                <Col xs={0} sm={0} md={6} lg={6} xl={6} className="my-3 my-md-0">
                                    <Card.Title className="mb-3 fs-4">{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    ))}
                </Card>
            </Container>
        </>
    );
}

export default SharingList;