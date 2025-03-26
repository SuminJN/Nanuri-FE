import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../apis/axios";

function UpdateItem() {
    const {itemId} = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        photo: '',
    });

    const {title, category, description, photo} = item; // 비구조화 할당

    const onChange = (e) => {
        const {value, name} = e.target;
        setItem({...item, [name]: value,});
    };

    const getItem = async () => {
        const response =  await axiosInstance.get(`/api/item/${itemId}`);
        setItem(response.data);
    };

    const updateItem = async () => {
        await axiosInstance.patch(`/api/item/${itemId}`, item).then(() => {
            alert('수정되었습니다.');
            navigate(`/item/${itemId}`, {replace: true})
        });
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className="mt-5">
            <Container className="col col-md-10 col-lg-8 bg-white p-5 border rounded shadow mb-5">
                <Form>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <img className="border border-2 rounded w-100 h-75 mb-3" src={photo} alt="photo"/>
                            <h4>{item.userId}</h4>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label column={"lg"}>제목</Form.Label>
                                <Form.Control type="text" name="title" value={title} onChange={onChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label column={"lg"}>카테고리</Form.Label>
                                <Form.Control type="text" name="category" value={category} onChange={onChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label column={"lg"}>자세한 설명</Form.Label>
                                <Form.Control as="textarea" rows={5} type="text" name="description" value={description}
                                              onChange={onChange}/>
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="outline-primary" onClick={updateItem}>수정 완료</Button>
                                <Button variant="outline-secondary"
                                        onClick={() => navigate(`/item/${itemId}`, {replace: true})}>취소</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </div>
    );
}

export default UpdateItem;