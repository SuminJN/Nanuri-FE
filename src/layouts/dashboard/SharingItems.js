import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import ItemCard from "../../components/ItemCard";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import useGetTime from "../../hooks/useGetTime";
import { getItemList } from "../../apis/itemApi";

function SharingItems() {
  const [itemList, setItemList] = useState(null);
  const { getCurrentTime, isNew } = useGetTime();

  useEffect(() => {
    getItemList().then((response) => {
      if (response.status === 200) {
        setItemList(response.data);
      }
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MDBox pt={1} pb={2} px={2}>
          <Grid container spacing={2}>
            {itemList === null
              ? null
              : itemList.map((item, idx) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={idx}>
                    {isNew(item.createdTime) ? (
                      <Badge.Ribbon text="New" color="red">
                        <ItemCard
                          itemId={item.itemId}
                          title={item.title}
                          description={item.description}
                          category={item.category}
                          image={item.image}
                          createdTime={getCurrentTime(item.createdTime)}
                          viewCount={item.viewCount}
                          wishCount={item.wishCount}
                          wishStatus={item.wishStatus}
                          route={`/home/${item.itemId}`}
                        />
                      </Badge.Ribbon>
                    ) : (
                      <ItemCard
                        itemId={item.itemId}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        createdTime={getCurrentTime(item.createdTime)}
                        viewCount={item.viewCount}
                        wishCount={item.wishCount}
                        isWished={item.isWished}
                        wishStatus={item.wishStatus}
                        route={`/home/${item.itemId}`}
                      />
                    )}
                  </Grid>
                ))}
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default SharingItems;
