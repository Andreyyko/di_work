import { apiClient } from "@/api/api-client";

export const fetchArticles = async () => {
  const res = await apiClient.get("/articles");
  return res.data.data;
};
