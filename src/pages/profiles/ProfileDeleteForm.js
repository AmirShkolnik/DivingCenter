import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';

const ProfileDeleteForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDeleteProfile = async () => {
    try {
      await axiosReq.delete(`/profiles/${id}/delete/`);
      toast.success('Profile deleted successfully!');
      history.push('/');
    } catch (error) {
      toast.error('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div>
      <Alert variant="warning">
        Are you sure you want to delete your profile? This action cannot be
        undone.
      </Alert>
      <Button variant="danger" onClick={handleDeleteProfile}>
        Confirm Delete
      </Button>
      <Button variant="secondary" onClick={() => history.goBack()}>
        Cancel
      </Button>
    </div>
  );
};

export default ProfileDeleteForm;
