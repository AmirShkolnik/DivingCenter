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
                    <h1>Welcome to Diving Center</h1>
                    <p>Come live out your ideal diving vacation with us</p>
                </div>
                <div className={styles['button-container']}>
                    <Link to="/signin" className={styles['home-btn']}>Explore</Link>
                    <Link to="/bookings/create" className={styles['home-btn']}>Book a Course</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;