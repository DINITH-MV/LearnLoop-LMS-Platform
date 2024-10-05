import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CodeBlock } from "./_components/codeBlock";
import { auth } from "@clerk/nextjs/server";

export default async function DebugHistory() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const codeHistory = await db.codeDebugger.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 lg:px-8 py-4 h-[1100px]">
      <div>
        <Button className="ml-[50px] mt-[20px] text-[14pt]">
          <Link
            href="/Features/code-debugger"
            className="flex items-center gap-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Code Debugger
          </Link>
        </Button>
      </div>

      <div className="mt-12">
        <CodeBlock data={codeHistory} />
      </div>
    </div>
  );
}
