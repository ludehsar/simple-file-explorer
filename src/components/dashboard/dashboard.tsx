"use client";

import React from "react";
import Sidebar from "./sidebar";

export interface DashboardProps {
  children: React.ReactNode;
}

export interface Drive {
  name: string;
  available_space: number;
  total_space: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="mx-auto my-8 flex w-full max-w-[1270px] items-center gap-8">
      <div className="basis-1/3">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
