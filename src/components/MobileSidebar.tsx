// components/MobileSidebar.tsx
"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
 
}

export const MobileSidebar = ( ) => {
  return (
    <div className="md:hidden p-4 flex items-center bg-gray-900 text-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-gray-900 text-white">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <span className="ml-4 font-semibold text-lg">Prompt Forge</span>
    </div>
  );
};

