import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

export const authUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

export const getRequiredUser = async () => {
  const user = await authUser();

  if (!user) unauthorized();

  return user;
};
