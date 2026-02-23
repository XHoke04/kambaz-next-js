"use client";

import { usePathname } from "next/navigation";

type BreadcrumbProps = {
  course?: { name: string };
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) =>
      part ? part[0].toUpperCase() + part.slice(1) : part
    )
    .join(" ");
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const cid = segments[1];

  const section =
    !last || last === cid ? "Home" : toTitleCase(last);

  return (
    <span>
      {course?.name ?? "Course"} &gt; {section}
    </span>
  );
}
