"use client";

import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings2Icon,
  Smile,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/dashboard/conversation",
    color: "text-cyan-400",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/dashboard/image",
    color: "text-sky-400",
  },
  {
    label: "Emoji Generation",
    icon: Smile,
    href: "/dashboard/emoji",
    color: "text-cyan-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/dashboard/code",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings2Icon,
    href: "/dashboard/settings",
    color: "text-cyan-400",
  },
];

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#2a3140] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold font-sans">Prompt Forge</span>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={`${route.color} group-hover:text-white h-5 w-5 mr-3 transition-colors`}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
