"use client"

import App from "@/App";
import GameNavbar from "@/components/GameNavbar";
import PersistentDrawerLeft from "@/components/PersistentDrawer";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <GameNavbar open={open} setOpen={setOpen} />
      <PersistentDrawerLeft open={open} setOpen={setOpen} />
      <App />
    </div>
  );
}