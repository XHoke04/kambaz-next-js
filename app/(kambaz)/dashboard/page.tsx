"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import * as db from "../database";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  type Course = (typeof db.courses)[number];

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const canManageCourses = currentUser?.role === "FACULTY";
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "CS",
    credits: 4,
    description: "New Description",
    image: "/images/reactjs.jpg",
  });
  const enrolledCourses = courses.filter((course) =>
    currentUser
      ? enrollments.some(
          (enrollment) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id,
        )
      : false,
  );
  const displayedCourses = showAllCourses ? courses : enrolledCourses;

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        {currentUser && (
          <button
            className="btn btn-primary float-end ms-2"
            id="wd-toggle-enrollments"
            onClick={() => setShowAllCourses((show) => !show)}
          >
            Enrollments
          </button>
        )}
        {canManageCourses && (
          <>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
          </>
        )}
      </h5>
      {canManageCourses && (
        <>
          <br />
          <FormControl
            className="mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={1} md={2} lg={4} className="g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = !!currentUser &&
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id,
              );
            return (
            <Col key={course._id} className="wd-dashboard-course">
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image || "/images/reactjs.jpg"}
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    {currentUser && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          if (isEnrolled) {
                            dispatch(
                              unenroll({
                                user: currentUser._id,
                                course: course._id,
                              }),
                            );
                          } else {
                            dispatch(
                              enroll({
                                user: currentUser._id,
                                course: course._id,
                              }),
                            );
                          }
                        }}
                        className={`btn ms-2 ${
                          isEnrolled ? "btn-danger" : "btn-success"
                        }`}
                        id={`wd-enrollment-toggle-${course._id}`}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {canManageCourses && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning ms-2"
                          id="wd-edit-course-click"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger ms-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
