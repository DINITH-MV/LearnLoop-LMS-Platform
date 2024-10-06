import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CodeBlock } from "./_components/codeBlock";
import { auth } from "@clerk/nextjs/server";

export default async function CodeHistory() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
    return;
  }

  const codeHistory = await db.generatedCode.findMany({    
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 lg:px-8 py-4 h-[1100px]">
      <div>
        <Button className="ml-[50px] mt-[20px] text-[14pt]">
          <Link
            href="/Features/code-generator"
            className="flex items-center gap-x-1"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Code Generator
          </Link>
        </Button>
      </div>

      <div className="mt-12">
        <CodeBlock data={codeHistory} />
      </div>
    </div>
  );
}
