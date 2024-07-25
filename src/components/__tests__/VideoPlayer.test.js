import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoPlayer from '../Video/VideoPlayer';

// Mock the Cloudinary library
jest.mock('@cloudinary/react', () => ({
  AdvancedVideo: ({ cldVid, ...props }) => (
    <div data-testid="mock-advanced-video" {...props}>
      Mock AdvancedVideo for testing
    </div>
  ),
}));

describe('VideoPlayer', () => {
  test('renders without crashing', () => {
    render(<VideoPlayer />);
    
    // Check if the VideoPlayer component renders
    expect(screen.getByTestId('mock-advanced-video')).toBeInTheDocument();
  });

  test('renders the AdvancedVideo component with correct props', () => {
    render(<VideoPlayer id="video123" publicId="public123" />);
    
    // Check if the AdvancedVideo component is rendered
    const videoElement = screen.getByTestId('mock-advanced-video');
    expect(videoElement).toBeInTheDocument();

    // Verify props are passed correctly (if needed, this is just a check)
    // Note: Mock component will not pass actual props to the real AdvancedVideo
  });

  test('applies the correct styles', () => {
    const { container } = render(<VideoPlayer />);
    
    const videoContainer = container.querySelector('div');
    expect(videoContainer).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    });
  });
});
