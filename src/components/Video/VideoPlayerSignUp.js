import React from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'duk6bc8tg',
  },
});

const VideoPlayerSignUp = (props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <AdvancedVideo
        cldVid={cld.video('160396821086388')} // Static video ID
        controls={false}
        autoPlay
        muted
        loop
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        {...props}
      />
    </div>
  );
};

export default VideoPlayerSignUp;
