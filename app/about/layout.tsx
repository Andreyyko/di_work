import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про нас | РОК-М",
  description:
    "Дізнайтеся більше про Богдану Андрейко, підхід РОК-М до ресурсно-орієнтованих когнітивних методик та місію підтримки психічного здоров'я.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Про нас | РОК-М",
    description:
      "Богдана Андрейко та підхід РОК-М: психологія, креатив і практичні методики для внутрішньої стійкості.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
