import React from 'react';
import Header from './header';
import { Typography, Row, Col, Button } from 'antd';
import landing_img from './static/assets/landing_img.jpg';
import Footer from './footer';
import './App.scss';
// import './static/styles/antd.css';
import 'antd/dist/antd.css';

const { Title, Paragraph } = Typography;

const App = (props: any) => {
    const { history } = props;
    return (
        <div className="app-container">
            <Header history={history} showActions={true} />
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
                    <Button className="vikas-btn-radius wid150" size="large" type="primary">
                        Register
                    </Button>
                </Typography>
                <Footer />
            </div>
        </div>
    );
};

export default App;
