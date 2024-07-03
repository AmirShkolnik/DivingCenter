import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/CoursesPage.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripHtmlTags = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

const CourseBox = ({ title, imageUrl, excerpt, slug, price, isUserAuthenticated }) => {
  const history = useHistory();

  const handleBookNowClick = useCallback((e) => {
    e.preventDefault();
    if (isUserAuthenticated) {
      history.push("/bookings/create");
    } else {
      toast.error("You must be logged in to book a course.");
      history.push("/signin");
    }
  }, [isUserAuthenticated, history]);

  const cleanExcerpt = stripHtmlTags(excerpt);

  return (
    <div className={styles.courseBox}>
      <h2>{title}</h2>
      <Row>
        <Col xs={12} md={4}>
          {imageUrl ? (
            <img
              src={imageUrl}
              className={styles.courseImage}
              alt={title}
              onError={(e) => {
                console.error(`Error loading image: ${imageUrl}`);
                e.target.src = '../images/courses/4.webp';
              }}
            />
          ) : (
            <div className={styles.PlaceholderImage}>No Image Available</div>
          )}
        </Col>
        <Col xs={12} md={8}>
          <p className={styles.courseDescription}>{cleanExcerpt}</p>
          <p className={styles.PriceDisplay}>Price: {price}</p>
          <div className={styles.buttonContainer}>
            <Button onClick={handleBookNowClick} className={styles.bookButton}>
              Book Now
            </Button>
            <Link to={`/courses/${slug}`} className={styles.homeButton}>
              Learn More
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isUserAuthenticated = isAuthenticated();

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const response = await axiosReq.get('/courses/');
        
        if (isMounted) {
          if (response.status === 200) {
            if (Array.isArray(response.data)) {
              setCourses(response.data);
            } else if (response.data.results && Array.isArray(response.data.results)) {
              setCourses(response.data.results);
            } else {
              console.error('Unexpected data structure:', response.data);
              setError('Unexpected data structure in API response');
            }
          } else {
            console.error('Unexpected API response status:', response.status);
            setError('Unexpected API response status');
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching courses:', err);
          setError(err.response?.data?.detail || 'Failed to load courses');
          toast.error('Failed to load courses. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container className={styles.coursesPage}>
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.coursesPage}>
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className={styles.coursesPage}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className={styles.courseTitle}>Our Diving Courses</h1>
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <CourseBox
            key={course.id}
            title={course.title}
            imageUrl={course.image}
            excerpt={course.excerpt}
            slug={course.slug}
            price={course.price_display || `${course.price} $`}
            isUserAuthenticated={isUserAuthenticated}
          />
        ))
      ) : (
        <Alert variant="info">No courses available at the moment.</Alert>
      )}
    </Container>
  );
};

export default CoursesPage;