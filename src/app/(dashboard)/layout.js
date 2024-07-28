import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth";
import Sidebar from "@/components/layouts/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cemilanku",
  description: "Toko sepatu terlengkap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
