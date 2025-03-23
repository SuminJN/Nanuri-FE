import {Col, Container, Row, Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect, useState} from "react";
import {Drawer} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function SharingList() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(null);
    const [open, setOpen] = useState(false);
    const [applicantList, setApplicantList] = useState([]);

    const onClickCard = (itemId) => {
        navigate(`/item/${itemId}`)
    };

    const getApplicant = (itemId) => {
        setOpen(true);
        axios.get(`/api/item/${itemId}/applicant`).then((res) => {
            setApplicantList(res.data);
        })
        console.log(applicantList);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get("/api/items").then((res) => {
                setItemList(res.data);
            }
        )
    }, [])

    return (
        <>
            <Container className="mt-md-0 mt-lg-5 col-md-10 col-lg-10 col-xl-8">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">나눔 중인 물건</Card.Header>
                    {itemList === null
                        ? null
                        : itemList.map((item, idx) => (
                            <Card.Body key={idx} className="border">

                                <Row className="m-3">
                                    <Col xs={0} sm={0} md={3} lg={3} xl={3} onClick={() => onClickCard(item.id)}>
                                        <Card.Img
                                            className=""
                                            variant="top"
                                            src={item.photo} width={100}
                                            height={200}/>
                                    </Col>

                                    <Col xs={0} sm={0} md={6} lg={6} xl={6} className="my-3 my-md-0"
                                         onClick={() => onClickCard(item.id)}>
                                        <Card.Title className="mb-3 fs-4">{item.title} </Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                    </Col>

                                    <Col className="d-grid d-md-flex align-items-md-center justify-content-md-center">
                                        <Button variant="outline-primary" onClick={() => getApplicant(item.id)}
                                                style={{whiteSpace: "nowrap"}}>
                                            신청자 보기
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        ))}

                    <Drawer title="나눔 받기 신청자" onClose={onClose} open={open}>
                        {
                            applicantList.map((applicant, idx) => (
                                <Row className="mb-3" key={idx}>
                                    <Col>
                                        <span>{applicant.userId}</span>
                                    </Col>

                                    <Col>
                                        <Button
                                            className="mx-5"
                                            variant="primary"
                                            style={{whiteSpace: "nowrap"}}>
                                            채팅하기
                                        </Button>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Drawer>
                </Card>
            </Container>
        </>
    );
}

export default SharingList;