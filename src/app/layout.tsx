import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "The Internet Archaeology Museum",
  description:
    "Preserving the technologies history forgot. And probably should have.",
  openGraph: {
    title: "The Internet Archaeology Museum",
    description:
      "Preserving the technologies history forgot. And probably should have.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
