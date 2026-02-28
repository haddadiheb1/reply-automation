import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fly Reply",
  description:
    "Répondez automatiquement aux commentaires et messages sur Instagram & Facebook et transformez-les en vraies commandes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${hankenGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
