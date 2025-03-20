import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import shirt from "../assets/images/items/shirt.jpeg";
import Button from "react-bootstrap/Button";
import {mockItem} from "../mocks/mockitem";

function ItemDetail() {
    const {itemId} = useParams();
    const navigate = useNavigate();

    // const getItemDetail = async () => {
    //     try{
    //         const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/item/${params.itemId}`);
    //         console.log("아이템 상세 조회 성공: ", response.data);
    //         return response;
    //     } catch(error) {
    //         console.log("아이템 상세 조회 실패: ", error);
    //
    //         throw error;
    //     }
    // }
    // useEffect(async () => {
    //     const data = await getItemDetail();
    // }, []);

    return (
        <div className="mt-5">
            <Container className="col col-md-10 col-lg-8 bg-white p-5 border rounded shadow mb-5">
                <Row>
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item onClick={() => {
                            navigate("/")
                        }}>홈</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => {
                            navigate("/items")
                        }}>나눔 목록</Breadcrumb.Item>
                        <Breadcrumb.Item active>{mockItem.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <img className="border border-2 rounded w-100 h-75 mb-3" src={mockItem.photo} alt="photo"/>
                        <h4>{mockItem.nickname}</h4>
                    </Col>
                    <Col>
                        <h3>{mockItem.title}</h3>
                        <p className="mb-5">{mockItem.category}</p>
                        <p className="mb-5">{mockItem.description}</p>
                        <div className="d-grid gap-2">
                            <Button variant="outline-primary"
                                    onClick={() => navigate(`/updateItem/${mockItem.id}`)}>수정하기</Button>
                            <Button variant="outline-secondary">삭제하기</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}


export default ItemDetail;