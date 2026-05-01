import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Developer Portfolio | System API",
  description: "Modern full-stack developer portfolio styled as an interactive API system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <ScrollProgress />
        <SmoothScroll>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24">
              <div className="max-w-5xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
