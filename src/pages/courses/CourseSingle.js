import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/CourseSingle.module.css';

function CourseSingle() {
  const { slug } = useParams();
  const currentUser = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [review, setReview] = useState({ content: '', rating: 0 });
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosReq.get(`/courses/${slug}/`);
        setCourse(data);
        if (currentUser) {
          const userReview = data.reviews.find(review => review.user === currentUser.username);
          if (userReview) {
            setUserReview(userReview);
            setReview({ content: userReview.content, rating: userReview.rating });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [slug, currentUser]);

  const handleReviewChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const handleRatingChange = (newRating) => {
    setReview({ ...review, rating: newRating });
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        const { data } = await axiosReq.put(`/reviews/${userReview.id}/`, review);
        setUserReview(data);
        setIsEditing(false);
      } else {
        const { data } = await axiosReq.post('/reviews/', { ...review, course: course.id });
        setCourse(prevCourse => ({
          ...prevCourse,
          reviews: [data, ...prevCourse.reviews]
        }));
        setUserReview(data);
      }
      setReview({ content: '', rating: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await axiosReq.delete(`/reviews/${userReview.id}/`);
      setCourse(prevCourse => ({
        ...prevCourse,
        reviews: prevCourse.reviews.filter(review => review.id !== userReview.id)
      }));
      setUserReview(null);
      setReview({ content: '', rating: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <Container>
      <Row className={styles.CourseHeader}>
        <Col md={6}>
          <Image src={course.image} alt={course.title} fluid className={styles.CourseImage} />
        </Col>
        <Col md={6}>
          <h1 className={styles.CourseTitle}>{course.title}</h1>
          <p className={styles.CourseDescription}>{course.description}</p>
          <p className={styles.CourseType}>Course Type: {course.course_type}</p>
          <StarRatings
            rating={course.average_rating}
            starRatedColor="#c7ae6a"
            numberOfStars={5}
            name='courseRating'
            starDimension="20px"
            starSpacing="2px"
            className={styles['star-ratings']}
          />
        </Col>
      </Row>
      <Row className={styles.ReviewSection}>
        <Col>
          <h2>Reviews</h2>
          {currentUser && (
            <Form onSubmit={handleSubmitReview} className={styles.ReviewForm}>
              <Form.Group>
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={review.content}
                  onChange={handleReviewChange}
                  required
                  className={styles['form-control']}
                />
              </Form.Group>
              <StarRatings
                rating={review.rating}
                starRatedColor="#c7ae6a"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name='rating'
                className={styles['star-ratings']}
              />
              <Button type="submit" className={`${styles.Button} ${styles.Blue}`}>
                {isEditing ? 'Update Review' : 'Submit Review'}
              </Button>
              {isEditing && (
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditing(false)} 
                  className={`${styles.Button} ${styles.Blue}`}
                >
                  Cancel
                </Button>
              )}
            </Form>
          )}
          {course.reviews.map(review => (
            <div key={review.id} className={styles.Review}>
              <p>{review.content}</p>
              <StarRatings
                rating={review.rating}
                starRatedColor="#c7ae6a"
                numberOfStars={5}
                name={`rating-${review.id}`}
                starDimension="15px"
                starSpacing="1px"
                className={styles['star-ratings']}
              />
              <p>By: {review.user}</p>
              {currentUser && currentUser.username === review.user && (
                <div>
                  <Button 
                    onClick={() => {
                      setReview({ content: review.content, rating: review.rating });
                      setIsEditing(true);
                    }}
                    className={`${styles.Button} ${styles.Blue}`}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={handleDeleteReview} 
                    className={`${styles.Button} ${styles.Blue}`}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default CourseSingle;