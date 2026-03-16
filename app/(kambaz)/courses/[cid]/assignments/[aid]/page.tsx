"use client";

import { useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  addAssignment,
  updateAssignment,
} from "../../../assignments/reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const canManageAssignments = !!currentUser && currentUser.role !== "STUDENT";
  const existingAssignment = assignments.find(
    (item) => item._id === aid && item.course === cid,
  );
  const createEmptyAssignment = () => ({
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });
  const [assignment, setAssignment] = useState(
    () => existingAssignment ?? createEmptyAssignment(),
  );

  if (aid !== "new" && !existingAssignment) {
    redirect(`/courses/${cid}/assignments`);
  }

  if (aid === "new" && !canManageAssignments) {
    redirect(`/courses/${cid}/assignments`);
  }

  const saveAssignment = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else if (existingAssignment) {
      dispatch(updateAssignment({ ...assignment, _id: existingAssignment._id }));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="pb-4">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            disabled={!canManageAssignments}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={6}
            value={assignment.description}
            disabled={!canManageAssignments}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={assignment.points}
              disabled={!canManageAssignments}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value || 0),
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-assignment-group">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS" disabled={!canManageAssignments}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="PERCENTAGE" disabled={!canManageAssignments}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={3} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ONLINE" disabled={!canManageAssignments}>
              <option value="ONLINE">Online</option>
              <option value="ON-PAPER">On Paper</option>
            </Form.Select>
            <div className="border rounded mt-3 p-3">
              <div className="fw-semibold mb-2">Online Entry Options</div>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
                disabled={!canManageAssignments}
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                defaultChecked
                className="mb-2"
                disabled={!canManageAssignments}
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
                disabled={!canManageAssignments}
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
                disabled={!canManageAssignments}
              />
              <Form.Check
                type="checkbox"
                id="wd-file-uploads"
                label="File Uploads"
                disabled={!canManageAssignments}
              />
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label>Assign to</Form.Label>
                <Form.Control defaultValue="Everyone" disabled={!canManageAssignments} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={assignment.dueDate}
                  disabled={!canManageAssignments}
                  onChange={(e) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={assignment.availableFrom}
                      disabled={!canManageAssignments}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableFrom: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={assignment.availableUntil}
                      disabled={!canManageAssignments}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableUntil: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        <hr />
        <div className="text-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={() => router.push(`/courses/${cid}/assignments`)}
          >
            {canManageAssignments ? "Cancel" : "Back"}
          </Button>
          {canManageAssignments && (
            <Button type="button" variant="danger" onClick={saveAssignment}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
