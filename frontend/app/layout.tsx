import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/global/header";

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
      <body className="min-h-full flex flex-col">
        <Auth0Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
