import React from "react";
import styles from "../../styles/CoursesPage.module.css";
import { Container, Row, Col } from "react-bootstrap";

const CourseBox = ({ title, imageSrc, description }) => (
  <div className={styles.courseBox}>
    <h2>{title}</h2>
    <Row>
      <Col xs={12} md={4}>
        <img src={imageSrc} alt={title} className={styles.courseImage} />
      </Col>
      <Col xs={12} md={8}>
        <p>{description}</p>
        <p>This course starts on the 10th of each month at 09:00 or 15:00 and lasts 2 weeks.</p>
      </Col>
    </Row>
  </div>
);

const CoursesPage = () => {
  return (
    <Container className={styles.coursesPage}>
      <h1>Our Diving Courses</h1>
      <CourseBox
        title="Open Water Diver"
        imageSrc="/path-to-open-water-image.jpg"
        description="Learn the basics of scuba diving and gain your first diving certification."
      />
      <CourseBox
        title="Advanced Open Water Diver"
        imageSrc="/path-to-advanced-open-water-image.jpg"
        description="Expand your diving skills and explore new underwater environments."
      />
      <CourseBox
        title="Rescue Diver"
        imageSrc="/path-to-rescue-diver-image.jpg"
        description="Learn to prevent and manage dive emergencies, minor and major."
      />
    </Container>
  );
};

export default CoursesPage;