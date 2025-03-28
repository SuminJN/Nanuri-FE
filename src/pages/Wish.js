import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../apis/axios";

function Wish() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(null);

    const onClickCard = (itemId) => {
        navigate(`/item/${itemId}`)
    };

    useEffect(() => {
        axiosInstance.get("/api/items").then((res) => {
                setItemList(res.data);
            }
        )
    }, [])

    return (
        <>
            <Container className="mt-md-0 mt-lg-5 col-md-10 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">위시 리스트</Card.Header>
                    {itemList === null
                        ? null
                        : itemList.map((item, idx) => (
                        <Card.Body key={idx}
                                   className="border"
                                   style={{cursor: "pointer"}}
                                   onClick={() => onClickCard(item.itemId)}>

                            <Row className="m-3">
                                <Col xs={0} sm={0} md={3} lg={3} xl={4}>
                                    <Card.Img
                                        className=""
                                        variant="top"
                                        src={item.image} width={100}
                                        height={200}/>
                                </Col>

                                <Col xs={0} sm={0} md={6} lg={6} xl={5} className="my-3 my-md-0">
                                    <Card.Title className="mb-3 fs-4">{item.title}</Card.Title>
                                    <Card.Text className="opacity-75">
                                        {item.createdTime}
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

export default Wish;