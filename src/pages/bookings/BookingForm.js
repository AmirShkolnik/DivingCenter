import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/BookingForm.module.css';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [courseId, setCourseId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/diving-courses/');
        console.log('Courses response:', response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings/', {
        date,
        time,
        course: courseId,
        additional_info: additionalInfo
      });
      console.log('Booking created:', response.data);
      // Reset form or redirect user
    } catch (error) {
      console.error('Error creating booking:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <h2>Book a Diving Course</h2>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
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
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
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
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;