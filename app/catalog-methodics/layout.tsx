import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог методик для психолога | РОК-М",
  description:
    "Онлайн каталог психологічних методик: ресурсно-орієнтовані та когнітивні вправи, психотерапевтичні техніки, практичні інструменти для психологів.",
  alternates: {
    canonical: "/catalog-methodics",
  },
  openGraph: {
    title: "Каталог методик для психолога | РОК-М",
    description:
      "База методик психології: інструменти для роботи з емоціями, тривожністю, мотивацією, комунікацією та психоемоційною сферою.",
    url: "/catalog-methodics",
    type: "website",
  },
};

export default function CatalogMethodicsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
