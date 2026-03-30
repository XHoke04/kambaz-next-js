"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaFileAlt, FaPlus, FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import * as client from "../../assignments/client";
import {
  deleteAssignment,
  setAssignments,
} from "../../assignments/reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const canManageAssignments = !!currentUser && currentUser.role !== "STUDENT";
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid,
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      const nextAssignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(nextAssignments));
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const formatDateTime = (value?: string) => {
    if (!value) return "TBD";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center mb-4">
        <div className="flex-fill">
          <div className="position-relative" style={{ maxWidth: "300px" }}>
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
            <input
              id="wd-search-assignment"
              placeholder="Search for Assignments"
              className="form-control ps-5"
            />
          </div>
        </div>
        <div className="ms-auto">
          {canManageAssignments && (
            <>
              <Button
                id="wd-add-assignment-group"
                variant="secondary"
                className="me-2 float-end"
              >
                <FaPlus className="me-2" />
                Group
              </Button>
              <Link href={`/courses/${cid}/assignments/new`}>
                <Button
                  id="wd-add-assignment"
                  variant="danger"
                  className="float-end"
                >
                  <FaPlus className="me-2" />
                  Assignment
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        <ListGroupItem
          id="wd-assignments-title"
          className="p-0 mb-3 fs-5 border-gray"
        >
          <div className="p-3 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <div className="ms-auto d-flex align-items-center">
              <span className="border rounded-pill px-2 me-3 small">
                40% of Total
              </span>
              <FaPlus className="me-3" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-item p-3 ps-1"
              >
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <BsGripVertical className="me-2 fs-3" />
                    <FaFileAlt className="text-success fs-4" />
                  </div>
                  <div className="flex-fill">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none text-dark fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small">
                      Multiple Modules |{" "}
                      <strong>Not available until</strong>{" "}
                      {formatDateTime(assignment.availableFrom)}
                    </div>
                    <div className="text-muted small">
                      <strong>Due</strong>{" "}
                      {formatDateTime(assignment.dueDate)} |{" "}
                      {assignment.points ?? "TBD"} pts
                    </div>
                  </div>
                  <div className="ms-auto">
                    <GreenCheckmark />
                    {canManageAssignments && (
                      <button
                        className="btn btn-link text-danger p-0 ms-2"
                        onClick={async () => {
                          const shouldDelete = window.confirm(
                            "Are you sure you want to remove this assignment?",
                          );
                          if (shouldDelete) {
                            await client.deleteAssignment(assignment._id);
                            dispatch(deleteAssignment(assignment._id));
                          }
                        }}
                        id={`wd-delete-assignment-${assignment._id}`}
                      >
                        Delete
                      </button>
                    )}
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
