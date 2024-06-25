import React from "react";
import styles from '../styles/LandingPage.module.css';
import VideoPlayer from '../components/Video/VideoPlayer.js';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className={styles.landingpage}>
            <VideoPlayer id="demo-player" publicId="ke9x3yszhi9wucopgon2" />
            <div className={styles['bg-overlay']}></div>
            <div className={styles['content-wrapper']}>
                <div className={styles['home-text']}>
                    <h1>Welcome to Diving Space</h1>
                    <p>Come live out your ideal diving vacation with us</p>
                </div>
            <Link to="/signin" className={styles['home-btn']}>Explore</Link>
        </div>
        </div>
    );
}

export default LandingPage;