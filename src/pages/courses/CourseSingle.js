import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Button, Form, Alert, Spinner, Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/CourseSingle.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseSingle() {
  const { slug } = useParams();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [review, setReview] = useState({ content: '', rating: 0 });
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axiosReq.get(`/courses/${slug}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
        if (err.response?.status === 401) {
          toast.error('Your session has expired. Please log in again.');
          localStorage.removeItem("authToken");
          history.push('/signin');
        } else {
          setError(err.response?.data?.detail || 'Failed to load course data');
          toast.error('Failed to load course data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug, currentUser, history]);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (review.rating === 0) {
      toast.error('Please select a star rating before submitting your review.');
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      let data;
      if (isEditing) {
        const response = await axiosRes.put(`/reviews/${userReview.id}/`, {
          content: review.content,
          rating: review.rating,
          course: course.id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = response.data;
        setUserReview(data);
        toast.success('Review updated successfully!');
      } else {
        const response = await axiosRes.post('/reviews/', {
          content: review.content,
          rating: review.rating,
          course: course.id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = response.data;
        setUserReview(data);
        toast.success('Review submitted successfully!');
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
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
        localStorage.removeItem("authToken");
        history.push('/signin');
      } else {
        setError(err.response?.data?.detail || 'Failed to submit review');
        toast.error('Failed to submit review. Please try again.');
      }
    }
  };

  const handleDeleteReview = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axiosRes.delete(`/reviews/${userReview.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourse(prevCourse => ({
        ...prevCourse,
        reviews: prevCourse.reviews.filter(review => review.id !== userReview.id)
      }));
      setUserReview(null);
      setReview({ content: '', rating: 0 });
      setShowDeleteConfirmation(false);
      toast.success('Review deleted successfully!');
    } catch (err) {
      console.error('Error deleting review:', err);
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
        localStorage.removeItem("authToken");
        history.push('/signin');
      } else {
        setError(err.response?.data?.detail || 'Failed to delete review');
        toast.error('Failed to delete review. Please try again.');
      }
    }
  };

  const handleAddReview = () => {
    if (!currentUser) {
      toast.error('Please log in to add a review.');
      history.push('/signin');
      return;
    }
    setIsEditing(false);
    setReview({ content: '', rating: 0 });
    setShowReviewForm(true);
  };

  const handleEditReview = (reviewContent, reviewRating) => {
    setReview({ content: reviewContent, rating: reviewRating });
    setIsEditing(true);
    setShowReviewForm(true);
    toast.info('Editing review...');
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">Error: {error}</Alert>
      ) : course ? (
        <>
          <div className={styles.CourseContainer}>
            <h1 className={styles.CourseTitle}>{course.title}</h1>
            <div className={styles.RatingBookingContainer}>
              <div className={styles.RatingContainer}>
                <p>Average Rating:</p>
                <StarRatings
                  rating={course.average_rating || 0}
                  starRatedColor="#c7ae6a"
                  numberOfStars={5}
                  name='courseRating'
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>
              <div className={styles.BookingPriceContainer}>
                <Button 
                  onClick={() => {
                    if (!currentUser) {
                      toast.error('Please sign in to book this course.');
                      history.push('/signin');
                    } else {
                      toast.success('Redirecting to booking page...');
                      history.push('/bookings/create');
                    }
                  }} 
                  className={`${styles.Button} ${styles.Blue}`}
                >
                  Book This Course
                </Button>
                <span className={styles.PriceDisplay}>
                 Price: {course.price_display || `${course.price}`}
                </span>
              </div>
            </div>
            {course.image && (
              <img src={course.image} alt={course.title} className={styles.CourseImage} />
            )}
            <div className={styles.CourseDescription} dangerouslySetInnerHTML={{ __html: course.description }} />
            <p className={styles.CourseType}>Course Type: {course.course_type}</p>
          </div>
          <div className={styles.ReviewSection}>
            <h2>Reviews</h2>
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
                    onChange={(e) => setReview({...review, content: e.target.value})}
                    required
                    className={styles['form-control']}
                  />
                </Form.Group>
                <div className={styles.RatingContainer}>
                  <Form.Label>Your Rating</Form.Label>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="#c7ae6a"
                    changeRating={(newRating) => setReview({...review, rating: newRating})}
                    numberOfStars={5}
                    name='rating'
                    starDimension="30px"
                    starSpacing="5px"
                  />
                </div>
                <div className={styles.ButtonContainer}>
                  <Button type="submit" className={`${styles.Button} ${styles.Blue} me-2`}>
                    {isEditing ? 'Update Review' : 'Submit Review'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setShowReviewForm(false);
                      toast.info('Review cancelled.');
                    }}
                    className={`${styles.Button} ${styles.DeleteRed}`}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
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
                      onClick={() => handleEditReview(review.content, review.rating)}
                      className={`${styles.Button} ${styles.Blue} me-2`}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirmation(true)}
                      className={`${styles.Button} ${styles.DeleteRed}`}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Alert variant="warning">No course data available</Alert>
      )}
      
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your review?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteReview}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CourseSingle;