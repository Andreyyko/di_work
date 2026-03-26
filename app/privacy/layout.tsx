import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності | РОК-М",
  description:
    "Політика конфіденційності РОК-М: обробка персональних даних, умови зберігання інформації та захист даних користувачів платформи.",
  keywords: [
    "політика конфіденційності",
    "захист персональних даних",
    "обробка персональних даних",
    "конфіденційність платформи",
    "безпека даних користувачів",
    "GDPR",
    "privacy policy",
  ],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Політика конфіденційності | РОК-М",
    description:
      "Ознайомтесь з правилами обробки та захисту персональних даних на платформі РОК-М.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
