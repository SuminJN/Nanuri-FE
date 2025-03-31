import {Button, Col, Container, Row} from "react-bootstrap";
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

    const handleCancel = async (wishId) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await axiosInstance.delete(`/api/wish/${wishId}`)
                    .then(res => {
                        alert("위시 리스트에서 삭제되었습니다.");
                    })
                window.location.reload();
            } catch (e) {
                console.log("취소 실패: ", e);
            }
        }
    }

    useEffect(() => {
        axiosInstance.get("/api/wish").then((res) => {
                setItemList(res.data);
                console.log(res.data)
            }
        )
    }, [])

    return (
        <>
            <Container className="p-0 mt-md-0 mt-lg-4 col-md-10 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">위시 리스트</Card.Header>
                    {itemList === null
                        ? null
                        : itemList.map((item, idx) => (
                        <Card.Body key={idx}
                                   className="border"
                                   style={{cursor: "pointer"}}
                        >

                            <Row className="m-3">
                                <Col xs={0} sm={0} md={6} lg={5} xl={5} onClick={() => onClickCard(item.itemId)}>
                                    <Card.Img
                                        variant="top"
                                        src={item.imageUrl} width={100}
                                        height={200}/>
                                </Col>

                                <Col xs={0} sm={0} md={6} lg={7} xl={7} className="my-3 my-md-0" onClick={() => onClickCard(item.itemId)}>
                                    <Card.Title className="mb-3 fs-4">{item.title}</Card.Title>
                                    <Card.Text className="opacity-75">
                                        {item.description}

                                    </Card.Text>
                                </Col>

                                <Col className="d-grid d-md-flex align-items-md-end justify-content-md-end">
                                    <Button variant="outline-danger"
                                            style={{whiteSpace: "nowrap"}}
                                            onClick={() => handleCancel(item.wishId)}
                                    >
                                        위시 삭제
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

export default Wish;