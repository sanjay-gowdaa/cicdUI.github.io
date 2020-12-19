import React, {useEffect, useState} from 'react';
import Header from './header';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';

import landing_img from './static/assets/landing_img.jpg';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import PrimaryBtn from './app-components/primaryBtn';

import './App.scss';
import 'antd/dist/antd.css';

const { Title, Paragraph } = Typography;

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
                <img src={landing_img} width="100%" height="90%" />
                <Typography className="main-content-banner">
                    <Title className="col-white">Value Proposition</Title>
                    <Paragraph className="col-white">
                        In the process of internal desktop applications development, many different
                        design specs and implementations would be involved, which might cause
                        designers and developers difficulties and duplication and reduce the
                        efficiency of development. CI build test
                    </Paragraph>
                    <PrimaryBtn
                        className="vikas-btn-radius wid150"
                        content="Register"
                        size="large"
                        onClick={() => setSignUpPopupVisible(!signUpPopupVisible)}
                    />
                </Typography>
                <Footer />
            </div>
        </div>
    );
};

export default App;
