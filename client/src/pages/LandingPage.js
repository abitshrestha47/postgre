import React from "react";
import image1 from "../images/img-12.png";
import image2 from "../images/img-13.png";
import image3 from "../images/img-14.png";
const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="content">
                <div className="images">
                    <img src={image1} alt="Landing" className="image1" />
                    <img src={image2} alt="Landing" className="image2" />
                    <img src={image3} alt="Landing" className="image3" />
                </div>
                    <h1>Welcome to Our Website</h1>
                <p>
                    Explore our amazing products and services. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                </p>
                <button>Get Started</button>
            </div>
            <div className="image"></div>
        </div>
    );
};

export default LandingPage;
