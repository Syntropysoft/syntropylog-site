import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingProvider from "@/components/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyntropySoft - Forjando el Futuro del DevSecOps",
  description: "Creamos herramientas inteligentes, seguras y eficientes para los equipos de desarrollo más exigentes del mundo.",
  icons: {
    icon: '/beaconLog-2.png',
    shortcut: '/beaconLog-2.png',
    apple: '/beaconLog-2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/beaconLog-2.png" type="image/png" />
        <link rel="shortcut icon" href="/beaconLog-2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/beaconLog-2.png" />
        <meta name="theme-color" content="#0c4a6e" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
