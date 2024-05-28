import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CGPA Calculator | By Beny Dishon</title>
        <meta
          name="description"
          content="Calculate your CGPA with ease using our simple CGPA Calculator. Input your grades and credits to get your CGPA instantly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="CGPA Calculator, Grade Calculator, Student Tools, Education"
        />
        <meta name="author" content="Beny Dishon" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-bold">CGPA Calculator</h1>
            <ModeToggle />
          </header>
          <main className="flex-grow container mx-auto p-4 flex flex-col">
            {children}
            <SpeedInsights />
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
