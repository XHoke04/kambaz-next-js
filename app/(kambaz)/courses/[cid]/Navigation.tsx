"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
];

export default function CourseNavigation() {
  const pathname = usePathname();
  const cid = pathname.split("/")[2] || "unknown";

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const segment = link.toLowerCase();
        const href = `/courses/${cid}/${segment}`;
        const isActive = pathname.includes(href);
        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${segment}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
