"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
export default function KambazNavigation() {
  const pathname = usePathname();
  const pathnameLower = pathname.toLowerCase();
  const links = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/dashboard", activePath: "/courses", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/labs",             icon: LiaCogSolid },
  ];
  const isAccount = pathnameLower.includes("/account");
  return (
    <ListGroup id="wd-kambaz-navigation" style={{width: 120}}
         className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroupItem id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/"
        action className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" /></ListGroupItem>
      <ListGroupItem as={Link} href="/account"
        className={`text-center border-0 bg-black
            ${isAccount ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser
          className={`fs-1 ${isAccount ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroupItem>
      {links.map((link) => {
        const activePath = (link.activePath ?? link.path).toLowerCase();
        const isActive = pathnameLower.includes(activePath);
        return (
          <ListGroupItem key={link.path} as={Link} href={link.path}
            className={`bg-black text-center border-0
              ${isActive ? "text-danger bg-white":"text-white bg-black"}`}>
            {link.icon({ className: "fs-1 text-danger"})}
            <br />
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
);}
