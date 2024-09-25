import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import "./styles/index.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
      <div className="h-[100px] md:pl-[255px] rounded-[20px] fixed inset-y-0 w-[1510px] z-50">
        <Navbar />
      </div>
      <div className="hidden bg-[#ffffff] md:flex h-full text-[14pt] w-[240px] flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-[280px] pt-[80px] w-[190vh] bg-[#fbf6f2] h-[100%]">        
          {children}
      </main>
      </ThemeProvider>
    </div>
  );
};

export default DashboardLayout;
