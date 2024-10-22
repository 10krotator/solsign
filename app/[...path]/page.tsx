"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { UnAuth } from "@/components/UnAuth";

interface DynamicPageProps {
  params: {
    path: string[];
  };
}

const DynamicPage: React.FC<DynamicPageProps> = ({ params }) => {
  const { status } = useSession();
  const { path } = params;

  if (status !== "authenticated") {
    return <UnAuth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 mx-auto">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter">
        Dynamic Page
      </h1>
      <p>Current path: {path.join("/")}</p>
      {/* Add more content here based on the dynamic path */}
    </div>
  );
};

export default DynamicPage;
