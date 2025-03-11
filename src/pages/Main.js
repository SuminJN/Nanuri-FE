import {Carousel, Image} from "react-bootstrap";
import carouselImage1 from "../assets/images/carousel1.jpg";
import carouselImage2 from "../assets/images/carousel2.jpg";
import carouselImage3 from "../assets/images/carousel3.jpg";

function Main() {
    console.log("window.innerWidth: ", window.innerWidth);
    return (
        <div className="pt-5">
            <Carousel>
                <Carousel.Item>
                    <Image src={carouselImage1}></Image>
                    <Carousel.Caption >
                        <h1 className="fw-bold">함께 나누는 기쁨, 따뜻한 우리.</h1>
                        <h3 className="fw-bold">당신의 나눔이 누군가의 따뜻한 하루가 됩니다</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={carouselImage2}></Image>
                    <Carousel.Caption>
                        <h1 className="fw-bold">필요 없는 물건, 필요한 누군가에게!</h1>
                        <h3 className="fw-bold">세상에서 가장 쉬운 선물, 나눔을 시작해보세요.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={carouselImage3}></Image>
                    <Carousel.Caption>
                        <h1 className="fw-bold">버리기 전에, 나눠보세요!</h1>
                        <h3 className="fw-bold">집에서 놀고 있는 물건, 새 주인을 찾아주세요!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="my-5">
                <br />
            </div>
        </div>
    );
}

export default Main;