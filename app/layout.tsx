import Header from "@/components/Header/Header";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import { main_page_backrounds } from "@/public/images/MainPageImages/backgrounds";

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

export const metadata = {
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
  openGraph: {
    title: "РОК-М — Ресурсно-орієнтовані когнітивні методики",
    description:
      "Унікальний психологічний ресурс для розвитку життєздатності, мотивації та психічного здоровʼя. 100+ методик, технік, вправ та тренінгів.",
    url: "https://rok-m.netlify.app",
    siteName: "РОК-М",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "https://rok-m.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "РОК-М – Психологічні методики",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        <Header />
        {children}
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${main_page_backrounds.FOOTER_BACKGROUND.src})`,
          }}
        >
          <Footer />
        </section>
      </body>
    </html>
  );
}
