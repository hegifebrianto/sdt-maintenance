import Header from "@/components/Header";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-screen bg-sdt-background flex flex-col">
      <Header />

      <main className="flex flex-col items-center">{children}</main>
      {/* <p>Hello World!</p> */}

    </div>
  );
}
