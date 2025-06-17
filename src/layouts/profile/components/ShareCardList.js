import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import ShareCard from "./ShareCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axios";
import Grid from "@mui/material/Grid";
import ItemCard from "../../../components/ItemCard";
import { getMyItemList } from "../../../apis/itemApi";
import { useRecoilState } from "recoil";
import { HistoryTabValue } from "../../../recoil/HistoryTapValue";

function ShareCardList() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState(null);
  const [tabValue, setTabValue] = useRecoilState(HistoryTabValue);

  useEffect(() => {
    getMyItemList().then((response) => {
      if (response.status === 200) {
        setItemList(response.data);
      }
    });
  }, []);

  return (
    <MDBox
      bgColor="white"
      borderRadius="lg"
      sx={{ borderColor: "grey.300", height: "100%" }}
      border={2}
      shadow="md"
    >
      <MDBox pt={2} px={2} mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          진행중인 나눔
        </MDTypography>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          onClick={() => {
            setTabValue(0);
            navigate("/my-share");
          }}
        >
          전체보기
        </MDButton>
      </MDBox>
      <MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          px={1}
          m={0}
          sx={{ overflowY: "auto", maxHeight: "400px" }} // 스크롤 가능하도록 스타일 추가
        >
          {itemList === null
            ? null
            : itemList.map((item) => (
                <MDBox key={item.itemId}>
                  <ShareCard
                    itemId={item.itemId}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    createdTime={item.createdTime}
                    viewCount={item.viewCount}
                    wishCount={item.wishCount}
                    chatCount={item.chatCount}
                    route={`/my-share/${item.itemId}`}
                  />
                </MDBox>
              ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default ShareCardList;
