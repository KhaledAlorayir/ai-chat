import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {AppHeader} from "@/components/layout/app-header";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSideBar} from "@/components/layout/app-side-bar";
import {Toaster} from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Chat Ai",
    description: "made by Khaled Alorayir",
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SidebarProvider>
            <AppSideBar/>

            <main className="h-dvh w-full">
                <AppHeader/>
                <section className="max-w-7xl mx-auto pb-4 px-2 h-[calc(100%-4rem)]">
                    {children}
                </section>
            </main>
            <Toaster/>
        </SidebarProvider>
        </body>
        </html>
    );
}
