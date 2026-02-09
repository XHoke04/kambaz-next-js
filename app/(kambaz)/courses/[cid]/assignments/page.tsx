"use client";

import Link from "next/link";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaFileAlt, FaPlus, FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";

export default function Assignments() {
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
          <Button
            id="wd-add-assignment-group"
            variant="secondary"
            className="me-2 float-end"
          >
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button
            id="wd-add-assignment"
            variant="danger"
            className="float-end"
          >
            <FaPlus className="me-2" />
            Assignment
          </Button>
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
            <ListGroupItem className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaFileAlt className="text-success fs-4" />
                </div>
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A1
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> May
                    6 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaFileAlt className="text-success fs-4" />
                </div>
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/124"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A2
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> May
                    13 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 20 at 11:59pm | 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-item p-3 ps-1">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaFileAlt className="text-success fs-4" />
                </div>
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/125"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A3
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> May
                    20 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
