import assets from "@/public/asset";
import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="grid grid-cols-1  lg:grid-cols-2">
          {children}
          <div className="auth-asset">
             <div className="">
                <Image src={assets.Authimg} alt="auth-img" width={600} height={600} />
             </div>
          </div>
      </main>
    );
  }
  