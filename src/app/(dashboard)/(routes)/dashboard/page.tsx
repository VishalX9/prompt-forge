"use client";

import {
  ArrowRight,
  Code,
  Image,
  MessageSquare,
Smile 
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/dashboard/conversation"
  },
  
  {
    label: "Image Generation",
    icon: Image,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/dashboard/image"
  },
  {
    label: "Emoji Generation",
    icon: Smile,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/dashboard/emoji"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/dashboard/code"
  }
];

const DashboardPage = () => {
  const router = useRouter();
  

  return (
    <div>
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-6">
        {tools.map((tool) => (
         <Card
  onClick={() => router.push(tool.href)}
  key={tool.href}
  className="p-3 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
>
  <div className="flex items-center gap-x-3">
    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
      <tool.icon className={cn("w-7 h-7", tool.color)} />
    </div>
    <div className="flex items-center gap-1 font-semibold">
      {tool.label}
      <ArrowRight className="w-4 h-4" />
    </div>
  </div>
</Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
