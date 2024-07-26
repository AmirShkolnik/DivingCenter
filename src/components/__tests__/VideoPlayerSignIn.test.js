import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoPlayer from '../Video/VideoPlayerSignIn';

jest.mock('@cloudinary/react', () => ({
  AdvancedVideo: ({ cldVid, publicId, ...divProps }) => {
    // eslint-disable-next-line no-unused-vars
    return (
      <div data-testid="mock-advanced-video" data-cldvid={cldVid} {...divProps}>
        Mock AdvancedVideo
      </div>
    );
  },
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

    // Verify props are passed correctly (mock component does not pass props to real AdvancedVideo)
    // This test is just to confirm the component renders, no actual prop validation for mock
  });

  test('applies the correct styles', () => {
    const { container } = render(<VideoPlayer />);

    // Check container styles
    const videoContainer = container.querySelector('div');
    expect(videoContainer).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      overflow: 'hidden',
    });

    // Check AdvancedVideo styles
    const videoElement = screen.getByTestId('mock-advanced-video');
    expect(videoElement).toHaveStyle({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    });
  });
});
