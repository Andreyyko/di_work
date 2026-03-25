import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизація | РОК-М",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
