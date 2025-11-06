"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "@/api/test";
import { Button } from "@/components/ui/button";

type Article = {
  id: number;
  documentId: string;
  title: string;
  content?: {
    type: string;
    children: { text: string }[];
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("❌ Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Articles</h2>
      <Button onClick={loadArticles} disabled={loading}>
        {loading ? "Loading..." : "Reload"}
      </Button>

      <div className="mt-6 space-y-3">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-4 text-left bg-gray-50 dark:bg-gray-800"
            >
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>

              {article.content?.map((block, index) => (
                <p key={index} className="text-sm opacity-80">
                  {block.children.map((child) => child.text).join(" ")}
                </p>
              ))}
            </div>
          ))
        ) : (
          <p className="opacity-70 mt-4">No articles found.</p>
        )}
      </div>
    </div>
  );
}
