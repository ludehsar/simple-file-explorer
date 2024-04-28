import Image from "next/image";
import Drives from "./drives";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Drives />
    </main>
  );
}
