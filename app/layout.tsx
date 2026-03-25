import Header from "@/components/Header/Header";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import { main_page_backrounds } from "@/public/images/MainPageImages/backgrounds";
import ClientLoaderWrapper from "@/components/common/ClientLoadingWrapper";
import type { Metadata } from "next";

const alexandra = localFont({
  src: "../public/fonts/alexandra-script.woff2",
  variable: "--font-alexandra",
  display: "swap",
});

const kudriashov = localFont({
  src: "../public/fonts/Kudriashov.woff2",
  variable: "--font-kudriashov",
  display: "swap",
});

const grava = localFont({
  src: [{ path: "../public/fonts/Grava-Normal.ttf" }],
  variable: "--font-grava",
  display: "swap",
});

const newStandard = localFont({
  src: "../public/fonts/New_Standard_Old.ttf",
  variable: "--font-newstandard",
  display: "swap",
});

const allegretto = localFont({
  src: "../public/fonts/Allegretto_Script_One_Regular.ttf",
  variable: "--font-allegretto",
  display: "swap",
});

const montserrat = localFont({
  src: "../public/fonts/Montserrat.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = "https://www.rok-mentalhealth.com";

export const metadata: Metadata = {
  title:
    "РОК-М — Ресурсно-орієнтовані когнітивні методики | Психологічний сайт №1 в Україні",
  description:
    "Перший в Україні психологічний сайт, що містить унікальні ресурсно-орієнтовані когнітивні та поведінкові методики, техніки, вправи, психологічні ігри та понад 100 тренінгів. Підтримка психічного здоровʼя, розвиток комунікації, подолання тривоги, робота з дітьми, сімʼєю та ПТСР.",
  keywords: [
    "психологічні методики",
    "когнітивно-поведінкові техніки",
    "ресурсно-орієнтована терапія",
    "психотерапія онлайн",
    "психічне здоровʼя",
    "тренінги психологія",
    "методики для дітей",
    "тривога панічні атаки",
    "психологічні ігри",
    "усвідомлене батьківство",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "РОК-М — Ресурсно-орієнтовані когнітивні методики",
    description:
      "Унікальний психологічний ресурс для розвитку життєздатності, мотивації та психічного здоровʼя. 100+ методик, технік, вправ та тренінгів.",
    url: siteUrl,
    siteName: "РОК-М",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "РОК-М – Психологічні методики",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "РОК-М — Ресурсно-орієнтовані когнітивні методики",
    description:
      "Унікальний психологічний ресурс для розвитку життєздатності, мотивації та психічного здоровʼя.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`
        ${alexandra.variable}
        ${kudriashov.variable}
        ${grava.variable}
        ${newStandard.variable}
        ${allegretto.variable}
        ${montserrat.variable}
      `}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/CommonImages/FlowerImages/hero-flower.svg"
        />
      </head>
      <body className="bg-brand-background">
      <ClientLoaderWrapper>
        <Header />
        <main>{children}</main>
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${main_page_backrounds.FOOTER_BACKGROUND.src})`,
          }}
        >
          <Footer />
        </section>
        </ClientLoaderWrapper>
      </body>
    </html>
  );
}
