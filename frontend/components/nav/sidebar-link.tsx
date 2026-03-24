import Link from "next/link";

export default function SidebarLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link href={href} className="flex flex-row gap-2 p-3 items-center">
      {children}
    </Link>
  );
}