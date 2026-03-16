"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();

  return (
    <Nav id="wd-account-navigation" variant="pills" className="flex-column fs-5 rounded-0">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/account/${link}`}
            active={pathname.endsWith(link)}
          >
            {link[0].toUpperCase() + link.slice(1)}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
