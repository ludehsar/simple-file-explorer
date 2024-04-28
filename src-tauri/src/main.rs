// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::ffi::OsString;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
struct Drive {
  name: OsString,
  available_space: u64,
  total_space: u64,
}

#[tauri::command]
fn get_disk_info() -> Vec<Drive> {
  let mut drives = Vec::new();
  let disks = sysinfo::Disks::new_with_refreshed_list();

  for disk in &disks {
    let drive = Drive {
      name: disk.name().into(),
      available_space: disk.available_space(),
      total_space: disk.total_space()
    };
    drives.push(drive.into());
  }

  return drives;
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_disk_info])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
