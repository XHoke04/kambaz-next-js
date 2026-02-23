"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Col, Form, Row } from "react-bootstrap";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = db.assignments.find(
    (item) => item._id === aid && item.course === cid
  );

  return (
    <div id="wd-assignments-editor" className="pb-4">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment?.title ?? ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={assignment?.description ?? ""}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              defaultValue={assignment?.points ?? 100}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-assignment-group">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS">
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
            <Form.Select defaultValue="PERCENTAGE">
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
            <Form.Select defaultValue="ONLINE">
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
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                defaultChecked
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              <Form.Check type="checkbox" id="wd-file-uploads" label="File Uploads" />
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
                <Form.Control defaultValue="Everyone" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={assignment?.dueDate ?? ""}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={assignment?.availableFrom ?? ""}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={assignment?.availableUntil ?? ""}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        <hr />
        <div className="text-end">
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-danger"
          >
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
