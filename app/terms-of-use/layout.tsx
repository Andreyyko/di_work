import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Умови користування | РОК-М",
  description:
    "Перегляньте умови користування платформою РОК-М: права, обов'язки сторін та правила доступу до матеріалів.",
  alternates: {
    canonical: "/terms-of-use",
  },
  openGraph: {
    title: "Умови користування | РОК-М",
    description:
      "Юридичні умови використання сервісу РОК-М та доступу до контенту.",
    url: "/terms-of-use",
    type: "website",
  },
};

export default function TermsOfUseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
