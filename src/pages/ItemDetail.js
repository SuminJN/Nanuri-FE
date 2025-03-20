import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import shirt from "../assets/images/items/shirt.jpeg";
import Button from "react-bootstrap/Button";

function ItemDetail() {
    const {itemId} = useParams();
    const navigate = useNavigate();

    let item = {
        id: itemId,
        title: "제목입니다",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est " +
            "lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. " +
            "Commodo odio aenean sed adipiscing diam donec adipiscing tristique. " +
            "Mi eget mauris pharetra et. Non tellus orci ac auctor augue. " +
            "Elit at imperdiet dui accumsan sit. " +
            "Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. " +
            "In hac habitasse platea dictumst quisque sagittis purus. " +
            "Pulvinar elementum integer enim neque volutpat ac.",
        place: "장소입니다",
        view_count: "조회수입니다",
        category: "카테고리입니다",
        userId: "userId 입니다",
        photo: shirt,
    }

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
                        <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <img className="border border-2 rounded w-100 h-75 mb-3" src={shirt} alt="photo"/>
                        <h4>{item.userId}</h4>
                    </Col>
                    <Col>
                        <h3>{item.title}</h3>
                        <p className="mb-5">{item.category}</p>
                        <p>{item.description}</p>
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