import { ReactNode } from "react";

interface HeadingProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon,
  iconColor = "text-blue-600",
  bgColor = "bg-gradient-to-br from-blue-50 to-purple-50",
}: HeadingProps) => {
  return (
    <div className={`px-6 lg:px-10 py-8 ${bgColor} rounded-2xl shadow-lg border border-gray-200`}>
      <div className="flex items-center gap-x-6">
        <div
          className={`p-4 rounded-xl ${iconColor} bg-white shadow-lg flex items-center justify-center text-2xl border border-gray-100`}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h1>
          <p className="text-base text-gray-600 font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};