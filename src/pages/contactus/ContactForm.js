import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/ContactForm.module.css';

const ContactForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageId, setMessageId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const { data } = await axiosReq.post('/contactus/', formData);
      // console.log('Response data:', data);
      setMessageId(data.id);
      setIsSubmitted(true);
      toast.success('Your message has been sent successfully!');
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.log(err);
      if (err.response?.data) {
        setErrors(err.response.data);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
    setMessageId(null);
  };

  const handleDeleteMessage = async () => {
   // console.log('Attempting to delete message. Message ID:', messageId);
    if (!messageId) {
      toast.error('No message to delete.');
      return;
    }
    try {
      await axiosReq.delete(`/contactus/${messageId}/`);
      // console.log('Delete response:', response);
      toast.success('Your message was deleted.');
      resetForm();
      history.push('/');
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('An error occurred while deleting your message. Please try again.');
      if (err.response) {
        console.error('Error response:', err.response.data);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.ContactForm}>
        <div className={styles.successMessage}>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We've received your message and will get back to you within 2 business days.</p>
          <div className={styles.buttonContainer}>
            <Button className={styles.SubmitButton} onClick={resetForm}>Send Another Message</Button>
            <Button className={styles.CancelButton} onClick={handleDeleteMessage}>Cancel My Message</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ContactForm}>
      <h2 className={styles.Title}>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name*</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject*</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          {errors.subject && <span className={styles.error}>{errors.subject}</span>}
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </Form.Group>
        <div className={styles.buttonContainer}>
          <Button className={styles.CancelButton} onClick={() => history.push('/')}>
            Cancel
          </Button>
          <Button type="submit" className={styles.SubmitButton}>
            Send Message
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
