import { authSession, getRequiredUser } from "@/src/lib/auth-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await authSession();
  const user = await getRequiredUser();

  if (!session.authorization) redirect(session.redirect);

  if ("redirect" in user) redirect(user.redirect);

  return <div>Dashboard</div>;
}
