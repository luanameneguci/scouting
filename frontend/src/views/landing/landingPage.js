import React from 'react';
import HeroImage from '../../assets/heroImage.png';
import './landingPage.css';

export default function LandingPage (){
    return (
        <div className='hero-section'>
            <img src={HeroImage} alt="Hero Image" />
        </div>
    );
};

