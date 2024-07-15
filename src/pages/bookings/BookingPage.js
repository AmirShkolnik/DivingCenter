import React, { useState, useEffect, useCallback } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import styles from '../../styles/BookingPage.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const BookingPage = () => {
  const currentUser = useCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const fetchBookings = useCallback(async () => {
    try {
      const response = await axiosReq.get('/bookings/');
      setBookings(response.data.results || []);
    } catch (err) {
      toast.error('Failed to fetch bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axiosReq.get('/courses/');
      setCourses(response.data.results || []);
    } catch (err) {
      toast.error('Failed to fetch courses. Please try again.');
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      history.push('/signin');
    } else {
      const fetchData = async () => {
        setLoading(true);
        await fetchBookings();
        await fetchCourses();
      };
      fetchData();
    }
  }, [currentUser, history, fetchBookings, fetchCourses]);

  useEffect(() => {
    if (location.state && location.state.refresh) {
      fetchBookings();
      history.replace(location.pathname, {});
    }
  }, [location, fetchBookings, history]);

  const handleEdit = (booking) => {
    setEditingBooking({ ...booking });
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { id, date, time, course, additional_info } = editingBooking;
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await axiosReq.put(`/bookings/${id}/`, {
        date: formattedDate,
        time,
        course,
        additional_info
      });
      setBookings(bookings.map(booking => booking.id === response.data.id ? response.data : booking));
      setEditingBooking(null);
      toast.success('Booking updated successfully!');
    } catch (err) {
      if (err.response && err.response.data) {
        Object.values(err.response.data).forEach(error => {
          toast.error(Array.isArray(error) ? error[0] : error);
        });
      } else {
        toast.error('Failed to update booking. Please try again.');
      }
    }
  };

  const handleDelete = (bookingId) => {
    setDeletingBookingId(bookingId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(`/bookings/${deletingBookingId}/`);
      setBookings(bookings.filter(booking => booking.id !== deletingBookingId));
      toast.success('Booking deleted successfully!');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        history.push('/signin');
      } else {
        toast.error('Failed to delete booking. Please try again.');
      }
    } finally {
      setShowConfirmation(false);
      setDeletingBookingId(null);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className={styles.bookingPage}>
        <h2 className={styles.bookingTitle}>Your Bookings</h2>
        <p>You have no bookings. Would you like to create one?</p>
        <button onClick={() => history.push('/bookings/create')} className={styles.bookingButton}>
          Create a Booking
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bookingPage}>
      <h2 className={styles.bookingTitle}>Your Bookings</h2>
      <p className={styles.motivationDescription}>
        Thank you for booking with us! We are thrilled to be part of your adventure. Remember, every dive is an opportunity to explore and discover new wonders beneath the waves. Happy diving!
      </p>
      
      <div className={styles.imageRow}>
        <img
          src="/images/courses/1.webp"
          alt="Diving scene 1"
          className={styles.rowImage}
          onError={(e) => e.target.src = '/images/courses/fallback1.webp'}
        />
        <img
          src="/images/courses/2.webp"
          alt="Diving scene 2"
          className={styles.rowImage}
          onError={(e) => e.target.src = '/images/courses/fallback2.webp'}
        />
        <img
          src="/images/courses/3.webp"
          alt="Diving scene 3"
          className={styles.rowImage}
          onError={(e) => e.target.src = '/images/courses/fallback3.webp'}
        />
      </div>

      {bookings.map(booking => (
        <div key={booking.id} className={styles.bookingItem}>
          {editingBooking && editingBooking.id === booking.id ? (
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={editingBooking.date}
                  onChange={(e) => setEditingBooking({...editingBooking, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <select
                  id="time"
                  value={editingBooking.time}
                  onChange={(e) => setEditingBooking({...editingBooking, time: e.target.value})}
                  required
                >
                  <option value="09:00">09:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
              <div>
                <label htmlFor="course">Course:</label>
                <select
                  id="course"
                  value={editingBooking.course}
                  onChange={(e) => setEditingBooking({...editingBooking, course: e.target.value})}
                  required
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="additionalInfo">Additional Information:</label>
                <textarea
                  id="additionalInfo"
                  value={editingBooking.additional_info}
                  onChange={(e) => setEditingBooking({...editingBooking, additional_info: e.target.value})}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className={styles.bookingButton}>Update</button>
              <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
            </form>
          ) : (
            <>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Course: {booking.course_name}</p>
              <p>Additional Info: {booking.additional_info}</p>
              <button onClick={() => handleEdit(booking)} className={styles.bookingButton}>Edit</button>
              <button onClick={() => handleDelete(booking.id)} className={styles.cancelButton}>Delete</button>
            </>
          )}
        </div>
      ))}
      {showConfirmation && (
        <>
          <div className={styles.overlay}></div>
          <div className={styles.confirmationDialog}>
            <p>Are you sure you want to delete this booking?</p>
            <button onClick={confirmDelete} className={styles.cancelConfirmButton}>Yes, Delete</button>
            <button onClick={() => setShowConfirmation(false)} className={styles.keepBookingButton}>No, Keep Booking</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingPage;
