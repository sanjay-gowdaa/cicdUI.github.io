import React from 'react';

import Home from './home';
import Aim from './aim';
import Ecosystem from './ecosystem';
import Commodities from './commodities';
import AboutUs from './aboutUs';
import User from './user';
import Legal from './legal';
import ContactUs from './contactUs';
import withFixedElement from './withFixedElement';

import './landingPage.scss';

const LandingPage = () => {
    return (
        <>
            <Home />
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

export default withFixedElement(LandingPage);
