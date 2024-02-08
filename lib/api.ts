import axios from "axios";

export const revalidate = 0;

export const getVideos = async () => {
  try {
    const res = await axios.get(`/api/videos`);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data || error?.message);
  }
};
