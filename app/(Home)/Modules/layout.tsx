import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="" >
      <ClerkProvider>{children}</ClerkProvider>
    </main>
  );
}
