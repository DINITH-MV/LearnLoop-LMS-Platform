import { db } from "@/lib/db";
import { CodeDebugger } from "@prisma/client";

type GetAnalysis = {
  userId: string;
  language: string;
  code: string;
  solution: string;
};

export const getDebugAnalysis = async (): Promise<{ analysis: CodeDebugger[]; codeIdCount: number }> => {
  try {
    const analysis = await db.codeDebugger.findMany({
      select: {
        id: true,
        language: true,
        code: true,
        solution: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Count the number of unique code ids
    const codeIdCount = analysis.length;

    return {
      analysis,
      codeIdCount,
    };
  } catch (error) {
    console.log("[GET_ANALYSIS]", error);
    return {
      analysis: [],
      codeIdCount: 0,
    };
  }
};
