import { db } from "@/lib/db";
import { CodeDebugger } from "@prisma/client";

type GeneratedCode = {
  id: string;
  prompt: string;
  generatedCode: string;
};

export const getGeneratedCodeAnalysis = async (): Promise<{
  analysis: GeneratedCode[];
  codeIdCount: number;
}> => {
  try {
    const analysis = await db.generatedCode.findMany({
      select: {
        id: true,
        userId: true,
        prompt: true,
        generatedCode: true,
        createdAt: true,
        updateAt: true,
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
