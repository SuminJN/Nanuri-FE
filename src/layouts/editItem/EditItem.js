import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../apis/axios";

const initState = {
  id: 0,
  nickname: "",
  title: "",
  description: "",
  viewCount: 0,
  category: "",
  shareStatus: "",
  createTime: "",
  wishCount: 0,
  images: [],
  isOwner: null,
};

const EditItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({ ...initState });

  useEffect(async () => {
    const response = await axiosInstance.get(`/api/item/${itemId}`);
    setItem(response.data);
    console.log(response.data);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}></MDBox>
    </DashboardLayout>
  );
};

export default EditItem;
