import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

export const authUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

export const authSession = async () => {
  const sess = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sess) redirect("/auth/login");

  const { session } = sess;

  if (session.expiresAt < new Date()) return null;

  return session.id;
};

export const getRequiredUser = async () => {
  const user = await authUser();

  if (!user) unauthorized();

  return user;
};
