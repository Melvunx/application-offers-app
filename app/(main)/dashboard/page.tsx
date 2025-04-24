import { authSession } from "@/src/lib/auth-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await authSession();

  if (!session.authorization) {
    redirect(session.redirect);
  }

  return <div>Dashboard</div>;
}
