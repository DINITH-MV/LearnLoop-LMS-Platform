import { db } from "@/lib/db";
import { feedback } from "@prisma/client";

type Feedback = feedback;

type GetFeedbacks = {
  userId: string;
};

export const getAllFeedbacks = async ({ userId }: GetFeedbacks): Promise<Feedback[]> => {
  try {
    const feedbacks = await db.feedback.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return feedbacks;
  } catch (error) {
    console.log("[GET_FEEDBACKS]", error);
    return [];
  }
};