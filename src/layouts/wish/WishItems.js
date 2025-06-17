import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import ItemCard from "../../components/ItemCard";
import { getWish } from "../../apis/wishApi";
import useGetTime from "../../hooks/useGetTime";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../recoil/LoginState";
import { LoginToast } from "../../components/LoginToast";
import { TabValue } from "../../recoil/TabValueState";
import { Spin } from "antd";

function WishItems() {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCurrentTime, isNew } = useGetTime();
  const isLogin = useRecoilValue(LoginState);
  const [tabValue, setTabValue] = useRecoilState(TabValue);

  useEffect(() => {
    const fetchWishes = async () => {
      if (isLogin) {
        setLoading(true);
        try {
          const res = await getWish();
          setItemList(res.data);
        } catch (err) {
          console.error("Error fetching wish items:", err);
        }
        setLoading(false);
      } else {
        LoginToast();
        setTabValue(0);
      }
    };

    fetchWishes();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MDBox pt={2} pb={2} px={2}>
          {loading ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
              <Spin tip="로딩 중..." size="large" />
            </MDBox>
          ) : (
            <Grid container spacing={2}>
              {itemList.map((item, idx) => (
                <Grid item xs={6} sm={4} md={4} lg={4} xl={3} key={idx}>
                  <ItemCard
                    itemId={item.itemId}
                    nickname={item.nickname}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    image={item.imageUrl}
                    createdTime={getCurrentTime(item.createdTime)}
                    viewCount={item.viewCount}
                    wishCount={item.wishCount}
                    wishStatus={item.wishStatus}
                    chatCount={item.chatCount}
                    route={`/wish/${item.itemId}`}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default WishItems;
