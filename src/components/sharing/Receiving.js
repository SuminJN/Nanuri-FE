import {Button, Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../apis/axios";

function Receiving() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(null);

    const onClickCard = (id) => {
        navigate(`/item/${id}`)
    };

    const handleCancel = async (itemId) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await axiosInstance.delete(`/api/history/${itemId}`).then(res => {
                    alert("나눔 대기가 취소되었습니다.");
                })
                window.location.reload();
            } catch (e) {
                console.log("대기 취소 실패: ", e);
            }
        }

    }

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
                    <Card.Header as="h2" className="text-center py-3">나눔 받기 대기 중</Card.Header>
                    {itemList === null
                        ? null
                        : itemList.map((item, idx) => (
                        <Card.Body key={idx}
                                   className="border"
                                   style={{cursor: "pointer"}}>

                            <Row className="m-3">
                                <Col xs={0} sm={0} md={3} lg={3} xl={4} onClick={() => onClickCard(item.itemId)}>
                                    <Card.Img
                                        variant="top"
                                        src={item.image} width={100}
                                        height={200}/>
                                </Col>

                                <Col xs={0} sm={0} md={6} lg={6} xl={5} className="my-3 my-md-0" onClick={() => onClickCard(item.itemId)}>
                                    <Card.Title className="mb-3 fs-4">{item.title}</Card.Title>
                                    <Card.Text className="opacity-75">
                                        {item.ago}
                                    </Card.Text>
                                </Col>

                                <Col className="d-grid d-md-flex align-items-md-end justify-content-md-end">
                                    <Button variant="outline-danger"
                                            style={{whiteSpace: "nowrap"}}
                                            onClick={() => handleCancel(item.itemId)}
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