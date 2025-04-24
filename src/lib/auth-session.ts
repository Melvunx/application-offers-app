import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

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

  if (!sess || sess.session.expiresAt < new Date())
    return { authorization: false, redirect: "/auth/login" };

  return {
    authorization: true,
    redirect: "/dashboard",
  };
};

export const getRequiredUser = async () => {
  const user = await authUser();

  if (!user) return { redirect: "/auth/login" };

  return user;
};
