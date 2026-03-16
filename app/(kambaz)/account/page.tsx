"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    router.replace(currentUser ? "/account/profile" : "/account/signin");
  }, [currentUser, router]);

  return null;
}
