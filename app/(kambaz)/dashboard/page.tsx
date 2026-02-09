"use client";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    {
      id: "4550",
      title: "CS4550 Web Development",
      desc: "Full Stack web application development",
      img: "/images/reactjs.jpg",
    },
    {
      id: "4100",
      title: "CS4100 Artificial Intelligence",
      desc: "Search, planning, and reasoning",
      img: "/images/ai.jpg",
    },
    {
      id: "3800",
      title: "CS3800 Theory of Computation",
      desc: "Formal languages and automata",
      img: "/images/TheoryOfComp.jpg",
    },
    {
      id: "3650",
      title: "CS3650 Computer Systems",
      desc: "Low-level systems programming",
      img: "/images/systems.jpg",
    },
    {
      id: "3500",
      title: "CS3500 Object-Oriented Design",
      desc: "Designing large software systems",
      img: "/images/ood.jpg",
    },
    {
      id: "3200",
      title: "CS3200 Database Design",
      desc: "Relational databases and SQL",
      img: "/images/database.jpg",
    },
    {
      id: "2800",
      title: "CS2800 Logic & Computation",
      desc: "Logic, proofs, and computation",
      img: "/images/logicandcomp.jpg",
    },
  ];

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={1} md={2} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course.id} className="wd-dashboard-course">
              <Card>
                <Link
                  href={`/courses/${course.id}/home`}
                  className="text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.img}
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="text-nowrap overflow-hidden">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.desc}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
