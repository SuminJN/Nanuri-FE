import axiosInstance from "./axios";

const prefix = "/api/item";

// 아이템 추가
export const addItem = async (inputs) => {
  return await axiosInstance.post("/api/item", inputs);
};

// 사진 업로드
export const uploadImages = async (itemId, formData) => {
  return await axiosInstance.post(`/api/image/${itemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 사진 삭제
export const deleteImage = async (itemId, imageIds) => {
  return await axiosInstance.delete(`/api/image/${itemId}`, { data: imageIds });
};

// 아이템 목록 조회
export const getItemList = async (category, search, sort) => {
  console.log("getItemList", category, search, sort);
  return await axiosInstance.get("/api/items", {
    params: {
      category: category,
      sort: sort,
    },
  });
};

// 아이템 목록 조회 + 검색
export const getSearchItemList = async (category, search, sort) => {
  console.log("getSearchItemList", category, search, sort);
  return await axiosInstance.get(`/api/items/search/${search}`, {
    params: {
      category: category,
    },
  });
};

// 아이템 목록 조회 (다른 유저의 아이템)
export const getOtherItemList = async (nickname) => {
  return await axiosInstance.get(`/api/items/${nickname}`);
};

// 아이템 목록 조회 (내가 나눔 중인 아이템)
export const getMyItemList = async () => {
  return await axiosInstance.get("/api/items/shared", { params: { done: "None" } });
};

// 아이템 목록 조회 (내가 나눔 완료한 아이템)
export const getMyCompletedItemList = async () => {
  return await axiosInstance.get("/api/items/shared", { params: { done: "Completed" } });
};

// 아이템 단건 조회
export const getItem = async (itemId) => {
  return await axiosInstance.get(`${prefix}/${itemId}`);
};

// 아이템 수정
export const editItem = async (itemId, item) => {
  return await axiosInstance.patch(`${prefix}/${itemId}`, item);
};

// 아이템 거래 완료 클릭
export const completeItem = async (itemId, item) => {
  return await axiosInstance.patch(`${prefix}/complete/${itemId}`, item);
};

// 아이템 삭제
export const deleteItem = async (itemId) => {
  return await axiosInstance.delete(`${prefix}/${itemId}`);
};
