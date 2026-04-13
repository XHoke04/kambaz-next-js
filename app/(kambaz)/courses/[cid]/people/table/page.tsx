"use client";

import { useParams } from "next/navigation";
import * as db from "../../../../database";
import PeopleTable from "../Table";

export default function PeopleTablePage() {
  const { cid } = useParams<{ cid: string }>();
  const { users, enrollments } = db;
  const courseUsers = users.filter((usr) =>
    enrollments.some(
      (enrollment) => enrollment.user === usr._id && enrollment.course === cid
    )
  );

  return <PeopleTable users={courseUsers} />;
}
