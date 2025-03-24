import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {RecoilRoot} from "recoil";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import LoginIng from "./services/LoginIng";
import PrivateRoute from "./services/PrivateRoute";
import Items from "./pages/Items";
import Chat from "./pages/Chat";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import UpdateItem from "./pages/UpdateItem";
import GlobalStyles from "./assets/styles/GlobalStyles";
import Sharing from "./components/sharing/Sharing";
import Wish from "./pages/Wish";
import {ConfigProvider} from "antd";
import ShareDone from "./components/sharing/ShareDone";
import Receiving from "./components/sharing/Receiving";
import ReceiveDone from "./components/sharing/ReceiveDone";

function App() {

    return (
        <>
            <GlobalStyles/>
            <ConfigProvider //antd
                theme={{
                    components: {
                        Radio: {
                            colorPrimary: "#3F72AF",
                        },
                    },
                }}
            >

                <RecoilRoot>
                    <BrowserRouter>
                        <Header/>

                        <Routes>
                            {/* 인증여부가 상관없는 페이지 */}
                            <Route path={process.env.REACT_APP_DEPLOY_URL} element={<Main/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "nanuri/callback"} element={<LoginIng/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "signup"} element={<Signup/>}/>
                            {/* 인증을 해야만 접속 가능한 페이지 */}
                            <Route element={<PrivateRoute/>}>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "items"} element={<Items/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "item/:itemId"} element={<ItemDetail/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "addItem"} element={<AddItem/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "updateItem/:itemId"} element={<UpdateItem/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "sharing"} element={<Sharing/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "shareDone"} element={<ShareDone/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "receiving"} element={<Receiving/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "receiveDone"} element={<ReceiveDone/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "chat"} element={<Chat/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "ranking"} element={<Ranking/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "wish"} element={<Wish/>}/>
                                <Route path={process.env.REACT_APP_DEPLOY_URL + "profile"} element={<Profile/>}/>
                            </Route>
                        </Routes>
                        <Footer/>
                    </BrowserRouter>
                </RecoilRoot>
            </ConfigProvider>
        </>
    );
}

export default App;
