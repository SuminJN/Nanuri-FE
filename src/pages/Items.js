import Button from "react-bootstrap/Button";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import img from "../assets/images/items/shirt.jpeg";

import itemData from "../assets/json/items.json";
import { useNavigate } from "react-router-dom";


function Items() {
    const navigate = useNavigate();
    const onClickCard = (id) => alert(id);

    const goToAddItem = () => {
        navigate("/addItem");
    }

    return (
        <>
            <Container className="my-5 py-5 w-75">
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="검색어를 입력해주세요"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={{span: 2, offset: 1}}>
                        <Button className="btn-primary" onClick={goToAddItem}>내 물건 나눔하기</Button>
                    </Col>
                </Row>


                <Row  className="mt-5">

                    <Col md={2} className="p-5 mx-4">
                        <p className="fw-bold pb-2">카테고리</p>
                        <Form>
                            {['디지털기기', '생활가전', '가구/인테리어', '생활/주방', '도서', '뷰티/미용', '취미/게임', '티켓/교환권']
                                .map((category, index) => (
                                <div key={index} className="mb-3">
                                    <Form.Check
                                        type="radio"
                                        name="category"
                                        label={category}
                                    />

                                </div>
                            ))}
                        </Form>
                    </Col>

                    <Col>
                        <Row xs={1} md={4} className="g-4">
                            {itemData.map((item, index) => (
                                <Col key={index}>
                                    <Card onClick={() => onClickCard(item.id)}>
                                        <Card.Img variant="top" src={img} width={100} height={180}/>
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Items;