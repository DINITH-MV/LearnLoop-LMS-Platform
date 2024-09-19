import { ConfettiProvider } from "@/app/Modules/components/providers/confetti-provider";
import { ToastProvider } from "@/app/Modules/components/providers/toaster-provider";
import { ThemeProvider } from "@/app/Modules/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <ClerkProvider>
        <ConfettiProvider />
        <ToastProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </main>
  );
}
