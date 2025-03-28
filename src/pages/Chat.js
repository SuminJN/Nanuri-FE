import {Avatar, Divider, List, Skeleton} from 'antd';
import {Container, Button} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect, useState} from "react";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

function Chat() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then(res => res.json())
            .then(body => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        loadMoreData();
        console.log(window.innerHeight)
    }, []);


    return (
        <Container className="bg-white p-3 rounded shadow-sm my-md-3 col col-md-10 col-lg-6 col-xl-5">
            <div
                id="scrollableDiv"
                style={{
                    height: 600,
                    overflow: 'auto',
                    padding: '0 16px',
                }}
            >

                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 1}
                    loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        header={<h3>채팅</h3>}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large}/>}
                                    title={item.name.last}
                                    description={item.email}
                                />
                                <Button variant="outline-primary">대화하기</Button>
                            </List.Item>
                        )}
                    />

                </InfiniteScroll>
            </div>
        </Container>
    );
}

export default Chat;