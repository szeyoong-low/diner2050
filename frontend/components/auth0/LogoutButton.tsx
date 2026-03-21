"use client";

import Link from "next/link";
import StandardButton from "../buttons/standard-button";

export default function LogoutButton() {
  return (
    <StandardButton link="/auth/logout">
      Log Out
    </ StandardButton >
  );
}