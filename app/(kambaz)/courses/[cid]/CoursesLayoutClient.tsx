"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import * as enrollmentsClient from "../../enrollments/client";
import { setEnrollments } from "../../enrollments/reducer";
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
  const [pending, setPending] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
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
    const fetchEnrollments = async () => {
      if (!currentUser) {
        dispatch(setEnrollments([]));
        setPending(false);
        return;
      }
      try {
        const nextEnrollments = await enrollmentsClient.findMyEnrollments();
        dispatch(setEnrollments(nextEnrollments));
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };
    fetchEnrollments();
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!pending && !hasAccess) {
      router.replace("/dashboard");
    }
  }, [hasAccess, pending, router]);

  if (pending || !hasAccess) {
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
