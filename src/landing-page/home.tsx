import React, { useState } from 'react';
import { Typography,Button, Carousel, Modal,Breadcrumb} from 'antd';
import { History } from 'history';
import { Trans, useTranslation } from 'react-i18next';
import googlePlay from "../static/assets/googleimage.png";
import firstImage from "../static/assets/landingImage.png";
import secondImage from "../static/assets/Vikasbandhu_Five.jpg";
import thirdImage from "../static/assets/Vikasbandhu_One.jpg";
import fourthImage from "../static/assets/Vikasbandhu_Two.jpg";
import fifthImage from '../static/assets/Image_Govt1.jpg';
import Register from '../login-ui/register';
// import wheatSvg from "../static/assets/wheat.svg";
// import Marquee from 'react-fast-marquee';
// import { ArrowLeftOutlined, ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';

// import { landingCards } from './const';

const { Title } = Typography;

const Home = ({ history, popUpTrigger, setSignUpPopupVisible }: { history: History, popUpTrigger: any, setSignUpPopupVisible: Function }) => {
    const { signUpPopupVisible } = popUpTrigger;
    

    const { t } = useTranslation('common');
    const [keyValue, setKeyValue] = useState(1);

    const decreaseCounter = () => {
        if (keyValue === 1) {
            setKeyValue(5);
        } else {
            setKeyValue(keyValue - 1);
        }
    };

    const increaseCounter = () => {
        if (keyValue === 5) {
            setKeyValue(1);
        } else {
            setKeyValue(keyValue + 1);
        }
    };




    return (
        <div id='home'>
            <div className='homeRow'>
                <div className='intBox'>
                    <div className='fHead'>
                        <h1>Sell.&nbsp;Buy.&nbsp;AgriProduce.</h1>
                    </div>
                    <div className='finfo'>
                        <p>A friendly digital E-market place for agricultural produce</p>
                    </div>
                    <div className='wimage'>

                    </div>
                    <div className='registerComponent'>
                        <p>Be part of VikasBandhu family!</p>
                        <Button onClick={() => setSignUpPopupVisible(!signUpPopupVisible)}>Register</Button>
                        <Modal
                            title={null}
                            visible={signUpPopupVisible}
                            footer={null}
                            maskClosable={false}
                            className='custom-register-modal'
                            onCancel={() => setSignUpPopupVisible(!signUpPopupVisible)}
                            centered
                            wrapClassName='register-popup-container'
                        >
                            <Register history={history} setSignUpPopupVisible={setSignUpPopupVisible} />
                        </Modal>
                    </div>
                    <div className='googlePlay'>
                        <Button><img src={googlePlay}></img></Button>
                    </div>
                </div>
                <div className='courselCircle'>
                    <Carousel autoplay speed={2500} dots={false} effect='fade' className='courselUnit'>
                        <div>
                            <img src={firstImage} className='contentStyle' ></img>
                        </div>
                        <div>
                            <img src={secondImage} className='contentStyle' ></img>
                        </div>
                        <div>
                            <img src={thirdImage} className='contentStyle'></img>
                        </div>
                        <div>
                            <img src={fourthImage} className='contentStyle'></img>
                        </div>
                        <div>
                            <img src={fifthImage} className='contentStyle'></img>
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className='headFooter'>
                <div className='firstL'>
                    <p>Recent Updates</p>
                    <a href='#updates'>view all</a>
                </div>
                <div className='secondL'>
                    {/* <Breadcrumb separator='|'>
                        <Breadcrumb.Item href='#mvp' key={1}>MVP Launched!</Breadcrumb.Item>
                        <Breadcrumb.Item href='#foodExb' key={2}>Food and Agri Tech exhibition</Breadcrumb.Item>
                        <Breadcrumb.Item href='#academia' key={3}>Academia Collaboration</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <a href='#mvp'>MVP Launched!</a>
                    <a href='#foodExb'>Food and Agri Tech exhibition</a>
                    <a href='#academia'>Academia Collaboration</a>
                </div>
            </div>
            <div className='divider'>
                <hr className='solid'>
                </hr>
                <div className='wimage'></div>
                <hr className='solid'>
                </hr>
            </div>
        </div>
    );
};

export default Home;
