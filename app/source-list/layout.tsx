import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Список джерел з психології та психотерапії | РОК-М",
  description:
    "Добірка джерел з психології, психотерапії та розвитку емоційного інтелекту: книги, підходи та матеріали, використані у методиках РОК-М.",
  keywords: [
    "список джерел психологія",
    "книги з психології",
    "література з психотерапії",
    "джерела для психолога",
    "наукові джерела психологія",
    "методичні матеріали психологія",
    "ресурси для психологів",
  ],
  alternates: {
    canonical: "/source-list",
  },
  openGraph: {
    title: "Список джерел з психології та психотерапії | РОК-М",
    description:
      "Перелік джерел і літератури, що лежать в основі психологічних методик на платформі РОК-М.",
    url: "/source-list",
    type: "website",
  },
};

export default function SourceListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
