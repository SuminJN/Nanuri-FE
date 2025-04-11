import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import PostCard from "../../components/PostCard";
import useGetTime from "../../hooks/useGetTime";

function ReceivingItems() {
  const [postList, setPostList] = useState(null);
  const { getCurrentTime } = useGetTime();

  useEffect(() => {
    axiosInstance.get("/api/want/posts").then((res) => {
      setPostList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Card>
          <MDBox pt={2} pb={2} px={2}>
            <Grid container spacing={2}>
              {postList === null
                ? null
                : postList.map((post, idx) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={idx}>
                      <PostCard
                        itemId={post.id}
                        title={post.title}
                        description={getCurrentTime(createdTime)}
                        createdTime={post.createdTime}
                        route={`/home/post/${post.id}`}
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

export default ReceivingItems;
