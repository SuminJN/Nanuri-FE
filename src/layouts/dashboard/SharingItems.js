import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import ItemCard from "../../components/ItemCard";
import { useEffect, useState } from "react";
import { Badge, Spin, Empty } from "antd";
import useGetTime from "../../hooks/useGetTime";
import { getItemList, getSearchItemList } from "../../apis/itemApi";
import PropTypes from "prop-types";

function SharingItems({ category, search, refresh, sortOrder }) {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCurrentTime, isNew } = useGetTime();

  const fetchItemList = async () => {
    setLoading(true);
    // const fetchFunction = search ? getSearchItemList : getItemList;
    try {
      const response = await getItemList(category, search, sortOrder);
      console.log(category, search, sortOrder);
      if (response.status === 200) {
        setItemList(response.data);
      }
    } catch (err) {
      console.error("Error fetching items", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItemList();
  }, [refresh]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MDBox pt={2} pb={2} px={2}>
          {loading ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
              <Spin tip="로딩 중..." size="large" />
            </MDBox>
          ) : itemList?.length === 0 ? (
            <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
              <Empty description="검색된 물건이 없습니다." />
            </MDBox>
          ) : (
            <Grid container spacing={3}>
              {itemList.map((item) => {
                const card = (
                  <ItemCard
                    itemId={item.itemId}
                    nickname={item.nickname}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    createdTime={getCurrentTime(item.createdTime)}
                    viewCount={item.viewCount}
                    wishCount={item.wishCount}
                    isWished={item.isWished}
                    wishStatus={item.wishStatus}
                    chatCount={item.chatCount}
                    route={`/home/${item.itemId}`}
                  />
                );

                let wrappedCard = card;

                if (item.shareStatus === "COMPLETED") {
                  wrappedCard = (
                    <Badge.Ribbon text="거래 완료" color="#4a4a4a">
                      {card}
                    </Badge.Ribbon>
                  );
                } else if (isNew(item.createdTime)) {
                  wrappedCard = (
                    <Badge.Ribbon text="New" color="red">
                      {card}
                    </Badge.Ribbon>
                  );
                }

                return (
                  <Grid item xs={6} sm={4} md={4} lg={4} xl={3} key={item.itemId}>
                    {wrappedCard}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </MDBox>
      </Grid>
    </Grid>
  );
}

SharingItems.defaultProps = {
  category: "",
  sortOrder: "",
};

SharingItems.propTypes = {
  category: PropTypes.string.isRequired,
  search: PropTypes.string,
  refresh: PropTypes.bool.isRequired,
  sortOrder: PropTypes.string,
};

export default SharingItems;
