import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CodeBlock } from "./_components/codeBlock";

export default async function CodeHistory() {
  const userId = "user_2iyMqRH11q6x04llS91O6mvdPDV";

  const codeHistory = await db.generatedCode.findMany({
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
        <Button className="ml-[50px] mt-[20px]">
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
