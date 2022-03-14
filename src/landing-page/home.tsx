import React from 'react';
import { Typography, Button, Carousel, Modal, Breadcrumb, Row, Col } from 'antd';
import { History } from 'history';
import { useTranslation } from 'react-i18next';
import googlePlay from '../static/assets/googleimage.png';
import firstImage from '../static/assets/landingImage.png';
import secondImage from '../static/assets/Vikasbandhu_Five.jpg';
import thirdImage from '../static/assets/Vikasbandhu_One.jpg';
import fourthImage from '../static/assets/Vikasbandhu_Two.jpg';
import fifthImage from '../static/assets/Image_Govt1.jpg';
import Register from '../login-ui/register';
import { LandingDivider } from '../app-components/landingDivider';

const { Title } = Typography;

const Home = ({ history, popUpTrigger, setSignUpPopupVisible }: { history: History, popUpTrigger: any, setSignUpPopupVisible: Function }) => {
    const { signUpPopupVisible } = popUpTrigger;
    const { t } = useTranslation('common');

    return (
        <div id='home'>
            <Row>
                <Col span={8} xs={24} md={12}>
                    <Title level={2}>Sell.&nbsp;Buy.&nbsp;AgriProduce.</Title>
                    <Title level={5}>{t('home_page.text1')}</Title>
                    <div className='wimage'></div>
                    <div className='registerComponent'>
                        <p>{t('home_page.text2')}</p>
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
                        <Button size='small' type ='link' href='https://play.google.com/store/apps/details?id=com.vikasBandhu' target='_blank'><img src={googlePlay}/></Button>
                    </div>
                    <div className='headFooter'>
                        <div className='firstL'>
                            <p>{t('home_page.text3')}</p>
                            <a href='#updates'>{t('home_page.text4')}</a>
                        </div>
                        <div className='secondL'>
                            <Breadcrumb separator='|'>
                                <Breadcrumb.Item href='#mvp'>{t('home_page.text5')}</Breadcrumb.Item>
                                <Breadcrumb.Item href='#foodExb'>{t('home_page.text6')}</Breadcrumb.Item>
                                <Breadcrumb.Item href='#academia'>{t('home_page.text7')}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
                <Col span={16} xs={0} md={12}>
                    <div className='courselCircle'>
                        <Carousel autoplay speed={2500} dots={false} effect='fade' className='courselUnit'>
                            <img src={firstImage} className='contentStyle' alt='firstImage' />
                            <img src={secondImage} className='contentStyle' alt='secondImage' />
                            <img src={thirdImage} className='contentStyle' alt='thirdImage'/>
                            <img src={fourthImage} className='contentStyle' alt='fourthImage'/>
                            <img src={fifthImage} className='contentStyle' alt='fifthImage'/>
                        </Carousel>
                    </div>
                </Col>
            </Row>
            <LandingDivider className='pageDivider'/>
        </div>
    );
};

export default Home;
