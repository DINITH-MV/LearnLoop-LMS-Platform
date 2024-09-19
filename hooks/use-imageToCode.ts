import { auth } from "@clerk/nextjs/server";

export async function dbHandle() {
  const { userId } = auth();

  console.log(userId);
}
