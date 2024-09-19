import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CodeBlock } from "./_components/codeBlock";

export default async function CodeHistory() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const codeHistory = await db.generatedCode.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 lg:px-8 py-4">
      <div>
        <Button>
          <Link href="/code-generator" className="flex items-center gap-x-1">
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
