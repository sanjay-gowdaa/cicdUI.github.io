import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import Header from './header';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import LandingPage from './landing-page/index';

import './App.scss';
import 'antd/dist/antd.css';

const App = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);

    useEffect(() => {
        dispatch(getConfigurations());
    }, []);

    return (
        <div className="app-container">
            <Header history={history} showActions={true} popUpTrigger={{setSignUpPopupVisible, signUpPopupVisible}} />
            <div className="main-content">
                <LandingPage />
            </div>
            <Footer />
        </div>
    );
};

export default App;