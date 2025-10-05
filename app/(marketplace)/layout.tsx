import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex-1 flex flex-col justify-between bg-alpha">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
