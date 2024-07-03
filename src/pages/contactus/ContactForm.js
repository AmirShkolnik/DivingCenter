import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
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
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageId, setMessageId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleDeleteMessage = async () => {
    if (!messageId) {
      toast.error('No message to delete.');
      return;
    }
    try {
      await axiosReq.delete(`/contactus/${messageId}/delete/`);
      toast.success('Your message was deleted.');
      resetForm();
      setShowConfirmModal(false);
      history.push('/');
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('An error occurred while deleting your message. Please try again.');
      if (err.response) {
        console.error('Error response:', err.response.data);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      let response;
      if (isEditing) {
        response = await axiosReq.put(`/contactus/${messageId}/`, formData);
      } else {
        response = await axiosReq.post('/contactus/', formData);
      }
      const { data } = response;
      setMessageId(data.id);
      setIsSubmitted(true);
      setIsEditing(false);
      toast.success(isEditing ? 'Your message has been updated successfully!' : 'Your message has been sent successfully!');
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
    setIsEditing(false);
    setMessageId(null);
  };  

  const handleCancelMessage = () => {
    setShowConfirmModal(true);
  };

  const handleEditMessage = () => {
    setIsEditing(true);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={styles.ContactForm}>
        <div className={styles.successMessage}>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We've received your message and will get back to you within 2 business days.</p>
          <img
            src="../images/courses/5.webp"
            alt="Thank you"
            className={styles.thankYouImage}
          />
          <p className={styles.placeholder}>
            Your inquiry is important to us. While you wait for our response, feel free to explore our courses and diving resources.
          </p>
          <div className={styles.buttonContainer}>
            <Button className={styles.EditButton} onClick={handleEditMessage}>Edit My Message</Button>
            <Button className={styles.CancelButton} onClick={handleCancelMessage}>Cancel My Message</Button>
          </div>
        </div>

        <Modal
  show={showConfirmModal}
  onHide={() => setShowConfirmModal(false)}
  className={styles.ConfirmModal}
>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Cancellation</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to cancel your message?</Modal.Body>
  <Modal.Footer>
    <Button 
      variant="secondary" 
      onClick={() => setShowConfirmModal(false)}
      className={styles.btn_secondary}
    >
      No, Keep My Message
    </Button>
    <Button 
      variant="danger" 
      onClick={handleDeleteMessage}
      className={styles.btn_danger}
    >
      Yes, Delete My Message
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    );
  }

  return (
    <div className={styles.ContactForm}>
      <h2 className={styles.Title}>{isEditing ? 'Edit Your Message' : 'Contact Us'}</h2>
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
          {isEditing ? (
            <>
              <Button className={styles.CancelButton} onClick={() => {
                setIsEditing(false);
                setIsSubmitted(true);
              }}>
                Cancel Edit
              </Button>
              <Button type="submit" className={styles.SubmitButton}>
                Update Message
              </Button>
            </>
          ) : (
            <>
              <Button className={styles.CancelButton} onClick={() => history.push('/')}>
                Cancel
              </Button>
              <Button type="submit" className={styles.SubmitButton}>
                Send Message
              </Button>
            </>
          )}

        </div>
      </Form>
    </div>
  );
};

export default ContactForm;