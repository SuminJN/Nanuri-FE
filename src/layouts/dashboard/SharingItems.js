import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import ItemCard from "../../components/ItemCard";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import useGetTime from "../../hooks/useGetTime";
import { getItemList, getSearchItemList } from "../../apis/itemApi";
import PropTypes from "prop-types";

function SharingItems({ category, search, refresh }) {
  const [itemList, setItemList] = useState(null);
  const { getCurrentTime, isNew } = useGetTime();

  const fetchItemList = async () => {
    const fetchFunction = search ? getSearchItemList : getItemList;
    const response = await fetchFunction(category, search);
    if (response.status === 200) {
      setItemList(response.data);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, [refresh]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MDBox pt={2} pb={2} px={2}>
          <Grid container spacing={3}>
            {itemList === null
              ? null
              : itemList.map((item, idx) => {
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
                      <Badge.Ribbon text="나눔 완료" color="#4a4a4a">
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
        </MDBox>
      </Grid>
    </Grid>
  );
}

SharingItems.defaultProps = {
  category: "",
};

SharingItems.propTypes = {
  category: PropTypes.string.isRequired,
  search: PropTypes.string,
  refresh: PropTypes.bool.isRequired,
};

export default SharingItems;
