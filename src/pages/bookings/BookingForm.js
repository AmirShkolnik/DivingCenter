import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import styles from '../../styles/BookingForm.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from 'react-toastify';
import Asset from "../../components/Asset";

const BookingForm = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    courseId: '',
    additionalInfo: ''
  });
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      history.push('/signin');
    }
  }, [currentUser, history]);

  const translateCourseName = (name) => {
    const courseNameMap = {
      'OW': 'Open Water',
      'AOW': 'Advanced Open Water',
      'RD': 'Rescue Diver'
    };
    return courseNameMap[name] || name;
  };

  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await axiosReq.get('/diving-courses/');
      setCourses(data.results || data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please sign in again.');
        history.push('/signin');
      } else {
        toast.error('Failed to fetch courses. Please try again.');
      }
    } finally {
      setHasLoaded(true);
    }
  }, [history]);

  useEffect(() => {
    let isMounted = true;
    if (currentUser) {
      fetchCourses().then(() => {
        if (isMounted) setHasLoaded(true);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [currentUser, fetchCourses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'date') {
      const selectedDate = new Date(value);
      if (selectedDate.getDate() !== 10) {
        setErrors(prev => ({ ...prev, date: 'Bookings are only available on the 10th of each month.' }));
      } else {
        setErrors(prev => ({ ...prev, date: undefined }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const formattedDate = new Date(formData.date).toISOString().split('T')[0];
      const formattedTime = formData.time + ':00';
  
      const { data } = await axiosReq.post('/bookings/', {
        date: formattedDate,
        time: formattedTime,
        course: parseInt(formData.courseId),
        additional_info: formData.additionalInfo
      });
      console.log('Booking created:', data);
      toast.success('Booking submitted successfully!');
      history.push('/bookings', { refresh: true });
    } catch (err) {
      console.error('Error creating booking:', err);
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please sign in again.');
        history.push('/signin');
      } else if (err.response && err.response.data) {
        setErrors(err.response.data);
        Object.values(err.response.data).forEach(error => {
          toast.error(Array.isArray(error) ? error[0] : error);
        });
      } else {
        setErrors({ message: 'An error occurred while creating the booking.' });
        toast.error('Failed to submit booking. Please try again.');
      }
    }
  };

  if (!hasLoaded) {
    return <Asset spinner />;
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
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>
      <div>
        <label htmlFor="time">Time (09:00 or 15:00):</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          <option value="09:00">09:00</option>
          <option value="15:00">15:00</option>
        </select>
        {errors.time && <span className={styles.error}>{errors.time}</span>}
      </div>
      <div>
        <label htmlFor="courseId">Diving Course:</label>
        <select
          id="courseId"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          required
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {translateCourseName(course.name)}
            </option>
          ))}
        </select>
        {errors.course && <span className={styles.error}>{errors.course}</span>}
      </div>
      <div>
        <label htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>
      <button className={styles.Button} type="submit">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;