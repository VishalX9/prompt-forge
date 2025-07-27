import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

import { auth } from "@clerk/nextjs/server"; // use `auth` instead of `getAuth` here
import { MobileSidebar } from "@/components/MobileSidebar";


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

   const session = await auth();
  const userId = session.userId;
  



  return (
    <div className="h-full relative">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar/>
      </div>
      <div className="md:hidden">
        <MobileSidebar/>
      </div>
      {/* Main Content */}
      <div className="md:pl-72">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
