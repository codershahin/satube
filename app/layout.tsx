import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "@/components/youtube/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaTube - Lets make life videos",
  description: "SaTube Lets make life videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-800 ${inter.className}`}>
        <Provider>
          <Header />
          <main className="md:flex">
            {/* <Sidebar /> */}
            <div className="md:flex-1 md:my-10 my-30">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </Provider>
      </body>
    </html>
  );
}
