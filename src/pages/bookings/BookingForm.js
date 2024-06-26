import React, { useState, useEffect } from 'react';
import { axiosRes } from "../../api/axiosDefaults";
import styles from '../../styles/BookingForm.module.css';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [courseId, setCourseId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translateCourseName = (name) => {
    const courseNameMap = {
      'OW': 'Open Water',
      'AOW': 'Advanced Open Water',
      'RD': 'Rescue Diver'
    };
    return courseNameMap[name] || name;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Stored token:', token);
  }, []);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axiosRes.get('/diving-courses/');
        setCourses(data.results || data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const formattedTime = time + ':00';
  
      const { data } = await axiosRes.post('/bookings/', {
        date: formattedDate,
        time: formattedTime,
        course: courseId,
        additional_info: additionalInfo
      });
      console.log('Booking created:', data);
      setIsSubmitted(true);
      resetForm();
    } catch (err) {
      console.error('Error creating booking:', err);
      if (err.response) {
        console.log('Error response:', err.response.data);
        setErrors(err.response.data);
      } else if (err.request) {
        console.log('Error request:', err.request);
        setErrors({ message: 'No response received from the server.' });
      } else {
        console.log('Error message:', err.message);
        setErrors({ message: 'An error occurred while creating the booking.' });
      }
    }
  };

  const resetForm = () => {
    setDate('');
    setTime('');
    setCourseId('');
    setAdditionalInfo('');
  };

  const isTenthOfMonth = (date) => {
    const selectedDate = new Date(date);
    return selectedDate.getDate() === 10;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (isTenthOfMonth(selectedDate)) {
      setDate(selectedDate);
      setErrors((prevErrors) => ({ ...prevErrors, date: undefined }));
    } else {
      setErrors({ date: 'Bookings are only available on the 10th of each month.' });
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <h2>Booking Submitted Successfully!</h2>
        <p>Your booking has been sent to the admin for review.</p>
        <button onClick={() => setIsSubmitted(false)}>Make Another Booking</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <h2>Book a Diving Course</h2>
      {errors.message && <div className={styles.error}>{errors.message}</div>}
      <div>
        <label htmlFor="date">Date (10th of the month):</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
        />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>
      <div>
        <label htmlFor="time">Time (09:00 or 15:00):</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option value="">Select a time</option>
          <option value="09:00">09:00</option>
          <option value="15:00">15:00</option>
        </select>
        {errors.time && <span className={styles.error}>{errors.time}</span>}
      </div>
      <div>
        <label htmlFor="course">Diving Course:</label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {translateCourseName(course.name)}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </select>
        {errors.course && <span className={styles.error}>{errors.course}</span>}
      </div>
      <div>
        <label htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          rows="4"
        ></textarea>
      </div>
      <button
        className={styles.Button}
        type="submit"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;