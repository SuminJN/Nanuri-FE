import {Carousel} from 'antd';

function Main() {
    const topText = {
        margin: 0,
        height: '250px',
        color: '#fff',
        lineHeight: '400px',
        textAlign: 'center',
        background: '#527dad',
    };

    const bottomText = {
        margin: 0,
        height: '250px',
        color: '#fff',
        textAlign: 'center',
        background: '#527dad',
    };

    return (
        <div className="">
            <Carousel arrows autoplay>
                <div>
                    <h1 className="fw-bold" style={topText}>함께 나누는 기쁨, 따뜻한 우리.</h1>
                    <h3 className="fw-bold" style={bottomText}>당신의 나눔이 누군가의 따뜻한 하루가 됩니다</h3>
                </div>
                <div>
                    <h1 className="fw-bold" style={topText}>필요 없는 물건, 필요한 누군가에게!</h1>
                    <h3 className="fw-bold" style={bottomText}>세상에서 가장 쉬운 선물, 나눔을 시작해보세요.</h3>
                </div>
                <div>
                    <h1 className="fw-bold" style={topText}>버리기 전에, 나눠보세요!</h1>
                    <h3 className="fw-bold" style={bottomText}>집에서 놀고 있는 물건, 새 주인을 찾아주세요!</h3>
                </div>
            </Carousel>
        </div>
    );
}

export default Main;