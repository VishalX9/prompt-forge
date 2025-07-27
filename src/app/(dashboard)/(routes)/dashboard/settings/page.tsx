"use client";

import { UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="flex justify-center pt-10">
      <UserProfile routing="hash" />
    </div>
  );
};

export default SettingsPage;
