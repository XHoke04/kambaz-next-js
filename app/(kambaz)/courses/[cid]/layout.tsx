import { ReactNode } from "react";
import { courses } from "../../database";
import CoursesLayoutClient from "./CoursesLayoutClient";
export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
 const { cid } = await params;
 const course = courses.find((course) => course._id === cid);
 return (
   <CoursesLayoutClient cid={cid} course={course}>
     {children}
   </CoursesLayoutClient>
);}
