import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";
import { authSession } from "@/src/lib/auth-session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authSession();
  if (!session.authorization) redirect(session.redirect);

  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
