import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Умови користування платформою | РОК-М",
  description:
    "Умови користування РОК-М: правила доступу до матеріалів, використання психологічних методик, оплати та відповідальність сторін.",
  keywords: [
    "умови користування",
    "правила користування платформою",
    "публічна оферта",
    "умови оплати послуг",
    "доступ до онлайн методик",
    "юридична інформація",
    "terms of use",
  ],
  alternates: {
    canonical: "/terms-of-use",
  },
  openGraph: {
    title: "Умови користування платформою | РОК-М",
    description:
      "Правила користування платформою РОК-М, умови доступу до контенту та правові положення.",
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
