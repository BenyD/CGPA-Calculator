// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'
import '@/app/globals.css'
import { ModeToggle } from '@/components/mode-toggle'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between p-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-bold">CGPA Calculator</h1>
            <ModeToggle />
          </header>
          <main className="flex-grow container mx-auto p-4 flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}