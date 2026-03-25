import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | РОК-М",
  description:
    "Відповіді на часті запитання про методики, сертифікати, результати та роботу платформи РОК-М.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | РОК-М",
    description:
      "Поширені запитання та відповіді про користування платформою РОК-М.",
    url: "/faq",
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
