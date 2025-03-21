import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {mockItems} from "../mocks/mockItems";

function ItemDetail() {
    const {itemId} = useParams();
    const navigate = useNavigate();

    const item = mockItems[itemId];

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
        <div className="mt-lg-5">
            <Container className="col col-md-10 col-lg-8  bg-white p-5 border rounded shadow-sm mb-5">
                <Row>
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item onClick={() => {
                            navigate("/")
                        }}>홈</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => {
                            navigate("/items")
                        }}>나눔 목록</Breadcrumb.Item>
                        <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Col xs={12} sm={12} md={12} lg={6}>
                        <img className="border border-2 rounded w-100 h-75 mb-3" src={item.photo} alt="photo"/>
                        <h4>{item.nickname}</h4>
                    </Col>

                    <Col>
                        <h3>{item.title}</h3>
                        <p className="mb-5">{item.category} ⸰ {item.ago}</p>
                        <p className="mb-5">{item.description}</p>

                        <p className="h6"><small>관심 {item.wishCount} ⸰ 조회 {item.viewCount}</small></p>
                        <div className="d-grid gap-2">
                            <Button variant="outline-primary"
                                    onClick={() => navigate(`/updateItem/${item.id}`)}>수정하기</Button>
                            <Button variant="outline-secondary">삭제하기</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}


export default ItemDetail;