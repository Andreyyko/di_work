import type { Metadata } from "next";
import { faqData } from "@/constant/FaqPageConstant/faqData";

type FaqItem = {
  question: string;
  answer: string;
};

export const metadata: Metadata = {
  title: "FAQ: методики, оплата, сертифікати, результати | РОК-М",
  description:
    "Часті запитання про психологічні методики РОК-М: вправи для дітей і дорослих, ПТСР і тривожність, оплата, доступ, сертифікати, результати та технічна підтримка.",
  keywords: [
    "faq психологічні методики",
    "часті запитання психологія",
    "методики для психолога питання",
    "психологічні вправи для дітей",
    "психологічні вправи для дорослих",
    "методики при ПТСР",
    "вправи при тривожності",
    "психотерапевтичні техніки питання",
    "оплата психологічних методик онлайн",
    "доступ після оплати",
    "повернення коштів психологічні курси",
    "сертифікат психологія онлайн",
    "формат сертифіката PDF",
    "результати психологічних практик",
    "платформа для психологів підтримка",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ: методики, оплата, сертифікати, результати | РОК-М",
    description:
      "Відповіді на поширені запитання про методики, тренінги, оплату, сертифікати, результати та користування платформою РОК-М.",
    url: "/faq",
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqItems = Object.values(faqData).flat() as FaqItem[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
