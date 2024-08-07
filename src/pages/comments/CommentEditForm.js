import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CommentCreateEditForm.module.css';
import { toast } from 'react-toastify';
import btnStyles from '../../styles/Button.module.css';
import UpdateConfirmationModal from '../../components/UpdateConfirmationModal';

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalAction('update');
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      if (isMounted.current) {
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
      }
    } catch (err) {
      if (isMounted.current) {
        toast.error('Error updating comment. Please try again.');
      }
    }
    if (isMounted.current) {
      setShowConfirmModal(false);
    }
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
            className={`${btnStyles.Button} ${
              formContent.trim() !== content ? btnStyles.Blue : btnStyles.Gray
            }`}
            disabled={formContent.trim() === content}
            type="submit"
          >
            save
          </button>
        </div>
      </Form>

      <UpdateConfirmationModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        handleConfirm={
          modalAction === 'update' ? handleConfirmSubmit : handleConfirmCancel
        }
      />
    </>
  );
}

export default CommentEditForm;
