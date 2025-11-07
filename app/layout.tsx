import "./globals.css";
import localFont from "next/font/local";

const alexandra = localFont({
  src: "../public/fonts/Alexandra_Script.ttf",
  variable: "--font-alexandra",
});

const kudriashov = localFont({
  src: "../public/fonts/Kudriashov.woff",
  variable: "--font-kudriashov",
});

const grava = localFont({
  src: [
    {path: "../public/fonts/Grava-Normal.ttf"}
  ],
  variable: "--font-grava",
});

const newStandard = localFont({
  src: "../public/fonts/New_Standard_Old.ttf",
  variable: "--font-newstandard",
});

const allegretto = localFont({
  src: "../public/fonts/Allegretto_Script_One_Regular.ttf",
  variable: "--font-allegretto",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <
      html lang="en"
      className={`
        ${alexandra.variable}
        ${kudriashov.variable}
        ${grava.variable}
        ${newStandard.variable}
        ${allegretto.variable}
      `}
      >
      <body>{children}</body>
    </html>
  );
}
