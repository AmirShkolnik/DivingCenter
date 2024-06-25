import React from "react";
import styles from '../styles/LandingPage.module.css';

const Landingpage = () => {
    const bgVideoUrl = 'https://res.cloudinary.com/duk6bc8tg/video/upload/f_auto:video,q_auto/ke9x3yszhi9wucopgon2';

    return (
        <div className={styles.landingpage}>
            <video src={bgVideoUrl} autoPlay muted loop className={styles['video-bg']} />
            <div className={styles['bg-overlay']}></div>

            <div className={styles['home-text']}>
                <h1>The Bubu Island</h1>
                <p>Come live out your ideal vacation with us</p>
            </div>

            <div className={styles['home-btn']}>Explore</div>
        </div>
    )
}

export default Landingpage;