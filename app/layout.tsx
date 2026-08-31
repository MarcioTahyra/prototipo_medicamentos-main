import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synthera | Inteligência Operacional Farmacêutica",
  description:
    "Plataforma SaaS para previsão de consumo, redistribuição inteligente e redução de perdas farmacêuticas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full text-slate-100">{children}</body>
    </html>
  );
}
