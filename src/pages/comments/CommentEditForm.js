import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CommentCreateEditForm.module.css';
import { toast } from 'react-toastify';
import btnStyles from '../../styles/Button.module.css';

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalAction('update');
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: 'now',
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      toast.success('Comment updated successfully!');
    } catch (err) {
      toast.error('Error updating comment. Please try again.');
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setModalAction('cancel');
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setShowEditForm(false);
    toast.info('Comment edit cancelled');
    setShowConfirmModal(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="pr-1">
          <Form.Control
            className={styles.Form}
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
        <div className="text-right">
          <button
            className={`${btnStyles.Button} ${btnStyles.Red}`}
            onClick={handleCancel}
            type="button"
          >
            cancel
          </button>
          <button
            className={`${btnStyles.Button} ${formContent.trim() !== content ? btnStyles.Blue : btnStyles.Gray}`}
            disabled={formContent.trim() === content}
            type="submit"
          >
            save
          </button>
        </div>
      </Form>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'update'
            ? 'Are you sure you want to update this comment?'
            : 'Are you sure you want to cancel editing this comment?'}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
            className={btnStyles.Button}
          >
            No, go back
          </Button>
          <Button
            variant={modalAction === 'update' ? 'primary' : 'danger'}
            onClick={
              modalAction === 'update'
                ? handleConfirmSubmit
                : handleConfirmCancel
            }
            className={`${btnStyles.Button} ${
              modalAction === 'update' ? btnStyles.Blue : btnStyles.Red
            }`}
          >
            Yes, {modalAction === 'update' ? 'update' : 'cancel'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentEditForm;
