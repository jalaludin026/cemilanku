import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth";
import Navbar from "@/components/layouts/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cemilanku",
  description: "Toko cemilan murmer (murah meriah)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
