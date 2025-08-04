'use client'

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
export default function Logout() {
  return (
    <LogoutLink className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap">
      Logout
    </LogoutLink>
  );
}
