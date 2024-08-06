import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/ContactForm.module.css';
import Asset from '../../components/Asset';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const handleDeleteMessage = async () => {
    if (!messageId) {
      toast.error('No message to delete.');
      return;
    }
    try {
      const deletionToken = localStorage.getItem(`deletion_token_${messageId}`);
      if (!deletionToken) {
        toast.error(
          'Unable to delete message. Please try submitting a new message.'
        );
        return;
      }
      await axiosReq.delete(
        `/contactus/${messageId}/?deletion_token=${deletionToken}`
      );
      toast.success('Your message was deleted.');
      resetForm();
      setShowConfirmModal(false);
      history.push('/'); // Redirect to the desired page after deletion
    } catch (err) {
      console.error('Error deleting message:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
      }
      if (err.response && err.response.status === 403) {
        toast.error(
          'Unable to delete message. The deletion token may be invalid or expired.'
        );
      } else {
        toast.error(
          'An error occurred while deleting your message. Please try again.'
        );
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      let response;
      if (isEditing) {
        const deletionToken = localStorage.getItem(
          `deletion_token_${messageId}`
        );
        if (!deletionToken) {
          toast.error(
            'Unable to update message. The deletion token is missing.'
          );
          return;
        }
        response = await axiosReq.put(
          `/contactus/${messageId}/?deletion_token=${deletionToken}`,
          formData
        );
      } else {
        response = await axiosReq.post('/contactus/', formData);
      }
      const { data } = response;
      setMessageId(data.id);
      localStorage.setItem(`deletion_token_${data.id}`, data.deletion_token);
      setIsSubmitted(true);
      setIsEditing(false);
      toast.success(
        isEditing
          ? 'Your message has been updated successfully!'
          : 'Your message has been sent successfully!'
      );
    } catch (err) {
      console.error('Error submitting message:', err);
      if (err.response?.status === 403) {
        toast.error('You do not have permission to update this message.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
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
    setIsChanged(false);
  };

  const handleCancelMessage = () => {
    setShowConfirmModal(true);
  };

  const handleEditMessage = () => {
    setIsEditing(true);
    setIsSubmitted(false);
    setIsChanged(false);
  };

  const hasChanges = () => {
    return Object.values(formData).some((value) => value.trim() !== '');
  };

  if (!hasLoaded) {
    return <Asset spinner />;
  }

  if (isSubmitted) {
    return (
      <div className={styles.ContactForm}>
        <div className={styles.successMessage}>
          <h2>Message Sent Successfully!</h2>
          <p>
            Thank you for contacting us. We&apos;ve received your message and
            will get back to you within 2 business days.
          </p>
          <img
            src="../images/courses/5.webp"
            alt="Thank you"
            className={styles.thankYouImage}
          />
          <p className={styles.placeholder}>
            Your inquiry is important to us. While you wait for our response,
            feel free to explore our courses and diving resources.
          </p>
          <div className={styles.buttonContainer}>
            <Button className={styles.EditButton} onClick={handleEditMessage}>
              Edit My Message
            </Button>
            <Button
              className={styles.CancelButton}
              onClick={handleCancelMessage}
            >
              Cancel My Message
            </Button>
          </div>
        </div>

        <DeleteConfirmationModal
          show={showConfirmModal}
          handleClose={() => setShowConfirmModal(false)}
          handleConfirm={handleDeleteMessage}
        />
      </div>
    );
  }

  return (
    <div className={styles.ContactForm}>
      <h2 className={styles.Title}>
        {isEditing ? 'Edit Your Message' : 'Contact Us'}
      </h2>
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
          {errors.subject && (
            <span className={styles.error}>{errors.subject}</span>
          )}
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
          {errors.message && (
            <span className={styles.error}>{errors.message}</span>
          )}
        </Form.Group>
        <div className={styles.buttonContainer}>
          {isEditing ? (
            <>
              <Button
                className={styles.CancelButton}
                onClick={() => {
                  setIsEditing(false);
                  setIsSubmitted(true);
                }}
              >
                Cancel Edit
              </Button>
              <Button
                type="submit"
                className={`${styles.SubmitButton} ${
                  !isChanged || !hasChanges() ? styles.DisabledButton : ''
                }`}
                disabled={!isChanged || !hasChanges()}
              >
                Update Message
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.CancelButton}
                onClick={() => history.push('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${styles.SubmitButton} ${
                  !isChanged || !hasChanges() ? styles.DisabledButton : ''
                }`}
                disabled={!isChanged || !hasChanges()}
              >
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
