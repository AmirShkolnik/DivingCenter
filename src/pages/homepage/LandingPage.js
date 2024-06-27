import React from "react";
import styles from '../../styles/LandingPage.module.css';
import VideoPlayer from '../../components/Video/VideoPlayer.js';
import { Link } from 'react-router-dom';

const LandingPage = () => {
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
                    <Link to="/signin" className={styles['home-btn']}>Diving Community</Link>
                    <Link to="/courses" className={styles['home-btn']}>Diving Courses</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;