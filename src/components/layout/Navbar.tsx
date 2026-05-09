import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12">
      <Link href="/" className="text-xl font-bold tracking-widest text-[#fafaf9] uppercase mix-blend-difference">
        Anshika Agarwal
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Profile/Login button — top right */}
        <ProfileMenu />
      </div>
    </header>
  );
}
