import {Container, Row, Col, Form, Image, Button} from "react-bootstrap";
import {Carousel} from 'antd';
import {Fragment, useRef, useState} from "react";
import {AiOutlinePicture} from "react-icons/ai";
import axiosInstance from "../apis/axios";

function AddItem() {
    const [inputs, setInputs] = useState({
        title: "",
        category: "",
        place: "",
        description: "",
    });
    const {title, place, category, description} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const imageRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);

    const addImageFile = (e) => {
        let tmp = e.target.files;
        if (tmp) {
            const reader = new FileReader();
            reader.readAsDataURL(tmp[0]);
            reader.onloadend = () => {
                if (reader.result) {
                    setImageFiles(prev => [...prev, reader.result]);
                }
            };
        }
    };

    const removeImageFile = (idx) => {
        setImageFiles(imageFiles.filter((e, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // https://selfdevelopcampus.tistory.com/entry/React-Axios-Post-FormData-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%9E%91-JSON-%EA%B0%99%EC%9D%B4-%EB%B3%B4%EB%82%B4%EA%B8%B0-%EC%97%90%EB%9F%AC-%EC%97%84%EC%B2%AD-%EB%82%9C-%ED%9B%84%EA%B8%B0
        // const formData = new FormData();
        // const json = JSON.stringify(inputs);
        // const blob = new Blob([json], {
        //     type: "application/mocks",
        // });
        // formData.append("createMenuDto", blob);
        // formData.append('files', imageFiles);
        //
        // console.log(imageFiles);
        // console.log(formData);
        // console.log(inputs);

       const response = await axiosInstance.post("/api/item", inputs);
        console.log(response);
        //
        // await axios({
        //     method: 'post',
        //     url: '/api/item',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         Authorization: "Bearer " + userState.token,
        //     },
        //     data: formData,
        // }).then((Response) => {
        //     if (Response.status === 200) {
        //         console.log("물건이 등록 되었습니다.");
        //     } else {
        //         alert("등록 오류가 생겼습니다. 다시 시도해주세요.");
        //     }
        // });
    }

    return (
        <>
            <Container className="mt-5">
                <h1 className="text-center mb-5">나의 물건 나눔</h1>

                <Row className="">
                    <Col className="mb-3 px-5" md={0} lg={6}>
                        {
                            imageFiles && imageFiles.length
                                ? <Container>
                                    <Carousel arrows autoplay className="text-black">
                                        {imageFiles.map((img, i) => (
                                            <div key={i}>
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        style={{position: 'absolute', zIndex: "10"}}
                                                        className="m-2"
                                                        variant="outline-danger"
                                                        onClick={() => removeImageFile(i)}
                                                    >X</Button>
                                                </div>
                                                <Image className="w-100"
                                                       src={img}
                                                       alt={img}
                                                       style={{
                                                           height: '45vh',
                                                           objectFit: "fill",
                                                           // backgroundColor: "grey"
                                                       }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Container>
                                : <Container className="d-flex justify-content-center align-items-center mt-4" style={{
                                    height: '45vh',
                                    backgroundColor: "lightgrey"
                                }}><AiOutlinePicture size="100" color="#555"/></Container>
                        }
                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-end">
                            <Button variant="outline-primary"
                                    onClick={() => {
                                        imageRef.current?.click();
                                    }}>
                                이미지 업로드
                            </Button>
                        </Container>
                        <Container className="d-flex justify-content-center mb-3">

                            <input
                                className="hidden"
                                id="imageInput"
                                accept=".png, .jpeg, .jpg"
                                type="file"
                                onChange={addImageFile}
                                ref={imageRef}
                                style={{display: 'none'}}
                            />
                        </Container>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label column="md">제목</Form.Label>
                                <Form.Control type="text" name="title" placeholder="글 제목" value={title}
                                              onChange={onChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label column="md">장소</Form.Label>
                                <Form.Control type="text" name="place" placeholder="장소" value={place}
                                              onChange={onChange}/>
                            </Form.Group>
                            {/*<Form.Group className="mb-3">*/}
                            {/*    <Form.Label column="md">나눔 희망 장소</Form.Label>*/}
                            {/*    <Form.Control type="text" name="location" placeholder="희망 장소를 적어주세요." value={location}*/}
                            {/*                  onChange={onChange}></Form.Control>*/}
                            {/*</Form.Group>*/}
                            <Form.Group className="mb-3">
                                <Form.Label column="md">카테고리</Form.Label>
                                <Form.Control type="text" name="category" placeholder="카테고리" value={category} onChange={onChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label column="md">자세한 설명</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="게시글 내용을 작성해 주세요." name="description"
                                              value={description} onChange={onChange}></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center my-5">
                    <button type="submit" className="btn btn-primary justify-content-center"
                            onClick={handleSubmit}>나눔 글 올리기
                    </button>
                </div>
            </Container>
        </>
    );
}

export default AddItem;