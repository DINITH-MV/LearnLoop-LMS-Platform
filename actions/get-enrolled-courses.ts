import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const getEnrolledCourses = async (): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        purchases: true, // Get all purchases, no filtering
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = courses.map(course => {
      // Check if the course has any purchases
      const hasPurchases = course.purchases.length > 0;
      
      return {
        ...course,
        progress: hasPurchases ? null : null, // Modify progress logic based on your needs
      };
    });

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
