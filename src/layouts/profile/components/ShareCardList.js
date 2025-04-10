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

function ShareCardList() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    axiosInstance.get("/api/items/shared", { params: { done: "None" } }).then((res) => {
      setItemList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          진행중인 나눔
        </MDTypography>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          onClick={() => navigate("/my-share")}
        >
          전체보기
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
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
                    route={`/my-share/${item.itemId}`}
                  />
                </MDBox>
              ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ShareCardList;
