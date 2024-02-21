import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" w-100vw h-[100vh] md:h-[82.5vh]">
      <Hero />
    </div>
  );
}
