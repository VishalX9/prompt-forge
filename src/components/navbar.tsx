"use client";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const handleToggle = () => {
    console.log("Toggle clicked");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#0f172a] text-white shadow-sm sticky top-0 z-50">
      <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={handleToggle}>
        <Menu />
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
