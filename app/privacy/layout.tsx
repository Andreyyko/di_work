import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності | РОК-М",
  description:
    "Ознайомтесь з політикою конфіденційності РОК-М: як ми збираємо, зберігаємо та захищаємо персональні дані користувачів.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Політика конфіденційності | РОК-М",
    description:
      "Правила обробки та захисту персональних даних на платформі РОК-М.",
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
