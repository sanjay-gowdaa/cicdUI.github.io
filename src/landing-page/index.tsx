import React from 'react';

import Aim from './aim';
import Ecosystem from './ecosystem';
import Commodities from './commodities';
import AboutUs from './aboutUs';
import User from './user';
import Legal from './legal';
import ContactUs from './contactUs';

import './landingPage.scss';

const LandingPage = () => {
    return (
        <>
            <Aim />
            <Ecosystem />
            <Commodities />
            <User />
            <AboutUs />
            <Legal />
            <ContactUs />
        </>
    );
};

export default LandingPage;
