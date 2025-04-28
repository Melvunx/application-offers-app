import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
