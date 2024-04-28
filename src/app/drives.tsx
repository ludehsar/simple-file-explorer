"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface Drive {
  name: string;
  available_space: number;
  total_space: number;
}

export default function Drives() {
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
          String.fromCharCode(unixValue)
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

  console.log(drivers);

  return <div>{drivers.map((driver) => driver.name)}</div>;
}
