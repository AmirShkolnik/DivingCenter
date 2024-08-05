import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MoreDropdown, ProfileEditDropdown } from '../MoreDropdown';
import { BrowserRouter as Router } from 'react-router-dom';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('MoreDropdown', () => {
  test('renders the dropdown and handles edit and delete actions', async () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    render(
      <Router>
        <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
      </Router>
    );

    // Click the custom dropdown toggle (ThreeDots)
    const toggleButton = screen.getByRole('button', {
      name: /toggle-dropdown/i,
    });
    fireEvent.click(toggleButton);

    // Check if edit and delete options are rendered
    expect(screen.getByLabelText('edit')).toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();

    // Click edit option
    fireEvent.click(screen.getByLabelText('edit'));
    expect(handleEdit).toHaveBeenCalledTimes(1);

    // Click delete option
    fireEvent.click(screen.getByLabelText('delete'));

    // Check if confirmation modal appears
    await waitFor(() => {
      expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    });

    // Click 'Delete' in the confirmation modal
    fireEvent.click(screen.getByText('Delete'));

    // Check if handleDelete was called
    expect(handleDelete).toHaveBeenCalledTimes(1);

    // Check if modal is closed after deletion
    await waitFor(() => {
      expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
    });
  });

  test('cancels deletion when Cancel button is clicked in modal', async () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    render(
      <Router>
        <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
      </Router>
    );

    // Open dropdown and click delete
    fireEvent.click(screen.getByRole('button', { name: /toggle-dropdown/i }));
    fireEvent.click(screen.getByLabelText('delete'));

    // Check if confirmation modal appears
    await waitFor(() => {
      expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    });

    // Click 'Cancel' in the confirmation modal
    fireEvent.click(screen.getByText('Cancel'));

    // Check if modal is closed and handleDelete was not called
    await waitFor(() => {
      expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
    });
    expect(handleDelete).not.toHaveBeenCalled();
  });
});

describe('ProfileEditDropdown', () => {
  // ... (ProfileEditDropdown tests remain the same)
});
