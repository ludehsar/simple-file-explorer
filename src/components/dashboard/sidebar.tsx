import { cn } from "@/lib/utils";
import { DashboardIcon, TrashIcon } from "@radix-ui/react-icons";
import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drive } from "./dashboard";

const Sidebar = () => {
  const [drivers, setDrivers] = useState<Drive[]>([]);

  const getDiskInfo = async () => {
    try {
      const result = await invoke<
        {
          name: { Unix: number[] };
          available_space: number;
          total_space: number;
        }[]
      >("get_disk_info");
      const driverData = result.map((drive) => ({
        name: drive.name.Unix.map((unixValue) =>
          String.fromCharCode(unixValue),
        ).join(""),
        available_space: drive.available_space,
        total_space: drive.total_space,
      }));
      setDrivers(driverData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDiskInfo();
  }, []);

  return (
    <div className="space-y-2">
      {drivers.map((driver, ind) => (
        <Button
          key={ind}
          variant="ghost"
          size="lg"
          className={cn(
            "w-full justify-start gap-3",
            "hover:bg-[#111111] hover:text-white",
            "focus:bg-[#111111] focus:text-white",
            "active:bg-[#111111] active:text-white",
          )}
        >
          <DashboardIcon />
          <span>{driver.name}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          "!mt-10 w-full justify-start gap-3",
          "hover:bg-[#111111] hover:text-white",
          "focus:bg-[#111111] focus:text-white",
          "active:bg-[#111111] active:text-white",
        )}
      >
        <TrashIcon />
        <span>Trash</span>
      </Button>
    </div>
  );
};

export default Sidebar;
