import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export const fetchArticles = async () => {
  const res = await axios.get(`${API_URL}/articles`);
  return res.data.data;
};
