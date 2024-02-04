"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/email/write", label: "Write Email" },
  { href: "/dashboard/email/sent", label: "Sent Emails" },
  { href: "/dashboard/tracking", label: "Tracking" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-[#28536B] h-screen">
      <div className="border-b border-b-stone-400 p-4">
        <Link href="/dashboard" className="text-2xl font-semibold text-white">
          Pocket Post
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-4 mt-4">
          {links.map(({ href, label }) => {
            const isActive = pathname.endsWith(href);

            return (
              <li
                key={`${href}${label}`}
                className={
                  "text-white hover:bg-[#7EA8BE] bg-[#28536B] border border-[#7EA8BE] " +
                  (isActive && "bg-[#7EA8BE]")
                }
              >
                <Link href={href} className="flex p-4">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
