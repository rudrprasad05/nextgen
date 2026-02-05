"use client";

import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Button } from "../ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";

export default function SiteAdminButton() {
  const { site } = useSite();

  return (
    <Button
      asChild
      variant={"outline"}
      className=" rounded-full p-0 fixed bottom-4 left-4 aspect-square z-50"
    >
      <Link href={site?.slug + "/admin"}>
        <Shield className="w-4 h-4" />
      </Link>
    </Button>
  );
}
