import React, { useState, useEffect, useMemo } from 'react';
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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosReq.get(`/courses/${slug}/`);
        console.log('Fetched course data:', data);
        setCourse(data);
        if (currentUser && data.reviews) {
          const userReview = data.reviews.find(review => review.user === currentUser.username);
          if (userReview) {
            setUserReview(userReview);
            setReview({ content: userReview.content, rating: userReview.rating });
          }
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course data');
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
    setIsSubmitting(true);
    try {
      let data;
      if (isEditing) {
        const response = await axiosReq.put(`/reviews/${userReview.id}/`, {
          content: review.content,
          rating: review.rating,
          course: course.id
        });
        data = response.data;
        console.log('Updated review:', data);
        setUserReview(data);
      } else {
        console.log('Submitting review:', {
          content: review.content,
          rating: review.rating,
          course: course.id
        });
        const response = await axiosReq.post('/reviews/', {
          content: review.content,
          rating: review.rating,
          course: course.id
        });
        data = response.data;
        console.log('Created review:', data);
        setUserReview(data);
      }

      setCourse(prevCourse => {
        const updatedReviews = isEditing
          ? prevCourse.reviews.map(rev => rev.id === data.id ? data : rev)
          : [data, ...(prevCourse.reviews || [])];
        return {
          ...prevCourse,
          reviews: updatedReviews,
          average_rating: calculateAverageRating(updatedReviews)
        };
      });

      setReview({ content: '', rating: 0 });
      setShowReviewForm(false);
      setIsEditing(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
      setError(`Failed to submit review: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await axiosReq.delete(`/reviews/${userReview.id}/`);
      console.log('Deleted review');
      setCourse(prevCourse => ({
        ...prevCourse,
        reviews: prevCourse.reviews.filter(review => review.id !== userReview.id)
      }));
      setUserReview(null);
      setReview({ content: '', rating: 0 });
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
    }
  };

  const handleAddReview = () => {
    setIsEditing(false);
    setReview({ content: '', rating: 0 });
    setShowReviewForm(true);
  };

  const calculateAverageRating = useMemo(() => {
    return (reviews) => {
      if (!reviews || reviews.length === 0) return 0;
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / reviews.length;
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Loading...</div>;

  return (
    <Container>
      <Row className={styles.CourseHeader}>
        <Col md={6}>
          {course.image ? (
            <Image src={course.image} alt={course.title} fluid className={styles.CourseImage} />
          ) : (
            <div className={styles.PlaceholderImage}>No Image Available</div>
          )}
        </Col>
        <Col md={6}>
          <h1 className={styles.CourseTitle}>{course.title}</h1>
          <div className={styles.CourseDescription} dangerouslySetInnerHTML={{ __html: course.description }} />
          <p className={styles.CourseType}>Course Type: {course.course_type}</p>
          <StarRatings
            rating={course.average_rating || 0}
            starRatedColor="#c7ae6a"
            numberOfStars={5}
            name='courseRating'
            starDimension="20px"
            starSpacing="2px"
          />
        </Col>
      </Row>
      <Row className={styles.ReviewSection}>
        <Col>
          <h2>Reviews</h2>
          {currentUser && (
            <>
              {!userReview && !showReviewForm && (
                <div className={styles.AddReviewButton}>
                  <Button onClick={handleAddReview} className={`${styles.Button} ${styles.Blue}`}>
                    Add Review
                  </Button>
                </div>
              )}
              {(showReviewForm || isEditing) && (
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
                  <div className={styles.RatingContainer}>
                    <Form.Label>Your Rating</Form.Label>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="#c7ae6a"
                      changeRating={handleRatingChange}
                      numberOfStars={5}
                      name='rating'
                      starDimension="30px"
                      starSpacing="5px"
                    />
                  </div>
                  <Button type="submit" className={`${styles.Button} ${styles.Blue} me-2`} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Review' : 'Submit Review')}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setShowReviewForm(false);
                    }}
                    className={`${styles.Button} ${styles.Red}`}
                  >
                    Cancel
                  </Button>
                </Form>
              )}
            </>
          )}
          {course.reviews && course.reviews.map(review => (
            <div key={review.id} className={styles.Review}>
              <p>{review.content}</p>
              <StarRatings
                rating={review.rating}
                starRatedColor="#c7ae6a"
                numberOfStars={5}
                name={`rating-${review.id}`}
                starDimension="15px"
                starSpacing="1px"
              />
              <p>By: {review.user}</p>
              {currentUser && currentUser.username === review.user && (
                <div>
                  <Button
                    onClick={() => {
                      setReview({ content: review.content, rating: review.rating });
                      setIsEditing(true);
                      setShowReviewForm(true);
                    }}
                    className={`${styles.Button} ${styles.Blue} me-2`}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDeleteReview}
                    className={`${styles.Button} ${styles.Red}`}
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