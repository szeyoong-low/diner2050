import "./globals.css";
import AppSidebar from "@/components/nav/app-sidebar";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/global/header";
import { type Metadata } from "next";
import { Michroma } from "next/font/google";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const michroma = Michroma({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diner 2050",
  description: "Your dinner will be served in 2050",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${michroma.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Auth0Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>
                <Toaster position="bottom-center" />
                <Header />
                <div className="relative">
                  <SidebarTrigger className="absolute top-0 left-0" />
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
