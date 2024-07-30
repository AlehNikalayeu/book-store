import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import '../styles/pages/Home.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div id="home" className="home-container">
            <div className="home-photo">
                <img src="/background/indoors-bookshelf-modern-design-comfortable-armchair-generative-ai.jpg" alt="home-photo" />
            </div>
            <div className="home-header">
                <h2 className="home-description" data-aos="fade-up">
                    Welcome to the Online Book Store
                </h2>
                <p className="quote" data-aos="fade-up" data-aos-delay="700">
                    "A room without books is like a body without a soul." – Cicero
                </p>
                <Link to="/categories" className="learn-more-btn" data-aos="fade-up" data-aos-delay="1000">
                    Learn More
                </Link>
            </div>
        </div>
    );
}

export default Home;
