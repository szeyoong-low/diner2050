"use client";

import StandardButton from "@/components/buttons/standard-button";

export default function LogoutButton() {
  return (
    <StandardButton link="/auth/logout">
      Log Out
    </ StandardButton >
  );
}