import React from "react";
import styles from '../../styles/LandingPage.module.css';
import VideoPlayer from '../../components/Video/VideoPlayer.js';
import { Link, useHistory } from 'react-router-dom';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const LandingPage = () => {
    const currentUser = useCurrentUser();
    const history = useHistory();

    const handleCommunityClick = (e) => {
        if (!currentUser) {
          e.preventDefault();
          history.push("/signin");
        }
      };

      const getUserProfilePath = () => {
        if (!currentUser) return "/signin";
        // Check for various possible identifier properties
        const userId = currentUser.id || currentUser.pk || currentUser.user_id;
        return userId ? `/profiles/${userId}` : "/profile";
    };

    return (
        <div className={styles.landingpage}>
            <VideoPlayer publicId="ke9x3yszhi9wucopgon2" />
            <div className={styles['bg-overlay']}></div>
            <div className={styles['content-wrapper']}>
                <div className={styles['home-text']}>
                    <h1>From Beginner Bubbles to Advanced Adventures.</h1>
                    <p>No matter your experience level, we have something for you. </p>
                    <p>Join our inclusive community or explore our diving courses designed for all skill sets.</p>
                </div>
                <div className={styles['button-container']}>
          {currentUser ? (
            <Link to={getUserProfilePath()} className={styles['home-btn']}>
            Welcome {currentUser.username}
            </Link>
                    ) : (
                        <button className={styles['home-btn']} onClick={handleCommunityClick}>
                            Diving Community
                        </button>
                    )}
                    <Link to="/courses" className={styles['home-btn']}>Diving Courses</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;