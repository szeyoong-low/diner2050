import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <h1 className="font-bold text-3xl">
        <Link href="/">Diner 2050</Link>
      </h1>
    </div>
  );
}