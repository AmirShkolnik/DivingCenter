import React from "react";
import styles from "../../styles/CoursesPage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const CourseBox = ({ title, imageUrl, description }) => {
  const history = useHistory();
  const currentUser = useCurrentUser();

  const handleBookNowClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      history.push("/bookings/create");
    } else {
      alert("You must be logged in to book a course.");
      history.push("/signin", { from: "/bookings/create" });
    }
  };

  return (
    <div className={styles.courseBox}>
      <h2>{title}</h2>
      <Row>
        <Col xs={12} md={4}>
          <img
            src={imageUrl}
            className={styles.courseImage}
            alt={title}
            onError={(e) => {
              console.error(`Error loading image: ${imageUrl}`);
              e.target.src = '../images/courses/4.webp';
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <p className={styles.courseDescription}>{description}</p>
          <p className={styles.courseDescription}>This course starts on the 10th of each month at 09:00 or 15:00 and lasts 2 weeks.</p>
          <Link to="/bookings/create" className={styles.bookButton} onClick={handleBookNowClick}>
            Book Now
          </Link>
        </Col>
      </Row>
    </div>
  );
};

const CoursesPage = () => {
  return (
    <Container className={styles.coursesPage}>
      <h1 className={styles.courseTitle}>Our Diving Courses</h1>
      <CourseBox
        title="Open Water Diver"
        imageUrl="../images/courses/1.webp"
        description="Learn the basics of scuba diving and gain your first diving certification."
      />
      <CourseBox
        title="Advanced Open Water Diver"
        imageUrl="../images/courses/2.webp"
        description="Expand your diving skills and explore new underwater environments."
      />
      <CourseBox
        title="Rescue Diver"
        imageUrl="../images/courses/3.webp"
        description="Learn to prevent and manage dive emergencies, minor and major."
      />
    </Container>
  );
};

export default CoursesPage;