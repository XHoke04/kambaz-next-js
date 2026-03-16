"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { RootState } from "../../store";

type CoursesLayoutClientProps = {
  children: ReactNode;
  cid: string;
  course?: { name: string };
};

export default function CoursesLayoutClient({
  children,
  cid,
  course,
}: CoursesLayoutClientProps) {
  const [showNavigation, setShowNavigation] = useState(true);
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const hasAccess = !!currentUser &&
    enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === cid,
    );

  useEffect(() => {
    if (!hasAccess) {
      router.replace("/dashboard");
    }
  }, [hasAccess, router]);

  if (!hasAccess) {
    return null;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <button
          className="btn btn-link text-danger text-decoration-none me-4 fs-4 p-0 mb-1 align-baseline"
          onClick={() => setShowNavigation((show) => !show)}
          type="button"
        >
          <FaAlignJustify />
        </button>
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className={showNavigation ? "d-none d-md-block" : "d-none"}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
