import Sidebar from "@/components/Home/sidebar";
import Image from "next/image";
import assets from "@/public/asset";
import Mobilenav from "@/components/mobile-nav/page";
import { getLoggedInUser } from "@/lib/action/user.server";
import { redirect} from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser()
  if(!loggedIn) redirect('/sign-in')
  
  return (
    <main className="size-full flex h-screen md:space-x-4">
      <div className="sidebar">
        <Sidebar user={loggedIn} />
      </div>

      <div className="flex flex-col size-full md">
        <div className="mobile-layout">
          <Image src={assets.Logo} alt="menu icon" width={30} height={30}></Image>
          <div>
            <Mobilenav user={loggedIn} />
          </div>
        </div>
        <div className="mx-4 md:mx-0 ">
          {children}
       </div>
      </div>
    </main>
  );
}
