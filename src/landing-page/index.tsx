import React from 'react';

import Aim from './aim';
import Ecosystem from './ecosystem';
import Commodities from './commodities';
// import AboutUs from './aboutUs';
// import User from './user';
import Legal from './legal';
import ContactUs from './contactUs';
import Team from './team';
import Updates from './updates';
import './landingPage.scss';

const LandingPage = () => {
    return (
        <React.Fragment>
            <Aim />
            <Ecosystem />
            <Commodities />
            {/* <User /> */}
            {/* <AboutUs /> */}
            <Team />
            <Legal />
            <ContactUs />
            <Updates/>
        </React.Fragment>
    );
};

export default LandingPage;
