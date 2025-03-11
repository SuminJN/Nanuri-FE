import {Col, Container, Row} from "react-bootstrap";
import itemData from "../assets/json/items.json";
import Card from "react-bootstrap/Card";
import img from "../assets/images/items/shirt.jpeg";

function MySharing() {
    const onClickCard = (id) => alert(id);

    return (
        <>
            <Container className="my-5 py-5 w-50">
                <div className="text-center mb-5">
                    <h2>나의 나눔 페이지</h2>
                </div>

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
            </Container>
        </>
    );
}

export default MySharing;