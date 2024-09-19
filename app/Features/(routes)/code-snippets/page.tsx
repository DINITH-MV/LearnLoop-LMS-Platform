import { Button } from "@/app/Modules/components/ui/button";
import { Edit, File, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Input } from "@/app/Modules/components/ui/input";

import { NewCodeSnippet } from "./_components/NewCodeSnippet";
import { CodeSnippets } from "./_components/codeSnippets";

const CodeSnippetsPage = async () => {
  const userId = "user_2iyMqRH11q6x04llS91O6mvdPDV";

  if (!userId) {
    return redirect("/");
  }

  const codeSnippets = await db.codeSnippet.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-6 py-10">
      <div className="text-center mb-[40px] font-bold text-[30pt]">
        CODE SNIPPETS
      </div>
      <div className="flex justify-between gap-2 float-right">
        <NewCodeSnippet />
      </div>

      <div className="mt-12">
        <CodeSnippets data={codeSnippets} />
      </div>
    </div>
  );
};

export default CodeSnippetsPage;
