import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ItemCard from "../../../components/ItemCard";
import { getMyWaitingItems } from "../../../apis/historyApi";

function ReceivingInformation() {
  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    getMyWaitingItems().then((response) => {
      setItemList(response.data);
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Card>
          <MDBox pt={3} px={2}>
            <MDTypography variant="h6" fontWeight="medium">
              신청 대기 중
            </MDTypography>
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            <Grid container spacing={2}>
              {itemList === null
                ? null
                : itemList.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={idx}>
                      <ItemCard
                        itemId={item.itemId}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        createdTime={item.createdTime}
                        viewCount={item.viewCount}
                        wishCount={item.wishCount}
                        chatCount={item.chatCount}
                        route={`/my-share/${item.itemId}`}
                      />
                    </Grid>
                  ))}
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ReceivingInformation;
