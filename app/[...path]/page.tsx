"use client";

import React from "react";
import { useAuth } from "@/app/context/auth";

import { UnAuth } from "@/components/UnAuth";


const DynamicPage: React.FC = () => {
  const { status } = useAuth();

  if (status !== "authenticated") {
    return <UnAuth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 mx-auto">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter">
        Dynamic Page
      </h1>
      <span className="text-sm text-muted-foreground">
        you landed on a dev page
      </span>
      {/* Add more content here based on the dynamic path */}
    </div>
  );
};

export default DynamicPage;
