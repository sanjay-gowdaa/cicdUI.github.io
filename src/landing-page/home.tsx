import React, { useState } from 'react';
import { Alert, Image, Typography, Row, Col, Card, Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { landingCards } from './const';

const { Text, Title } = Typography;

const Home = () => {
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

    const goToAim = (url: any) => {
        window.location = url;
    };

    return (
        <div id='home'>
            <div className='home-content-wrapper'>
                <Alert
                    className='animate-alert'
                    message={
                        <Marquee
                            pauseOnHover={true}
                            speed={25}
                            gradient={false}
                        >
                            <Trans>
                                <b>&nbsp; &nbsp;&nbsp; &nbsp;</b>
                                <Trans
                                    i18nKey='home_page.flash_text'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                                <b>&nbsp; &nbsp;{t('home_page.update_1')}&nbsp; &nbsp;</b>
                                <Trans
                                    i18nKey='home_page.update_2'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                                <b>&nbsp; &nbsp;&nbsp;</b>
                                <Trans
                                    i18nKey='home_page.update_3'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                            </Trans>
                        </Marquee>
                    }
                    banner
                />
                <div className='mobile-home-content'>
                    <Title className='col-white home-title' level={1}>
                        {t('title')}
                    </Title>
                    <Text className='col-white home-text'>{t('home_page.mobile_home_text')}</Text>
                    <br />
                    <Button className='explore-vb-btn' onClick={() => goToAim('#aim')}>
                        <Title className='col-white margin-none' level={5}>
                            {t('landing_page.actions.explore')}
                        </Title>
                    </Button>
                </div>
                <Row className='landing-row'>
                    {landingCards.map((list: any) => {

                        return (
                            list.key === keyValue ?
                                <React.Fragment>
                                    <Col span={8} className='landing-col-8'>
                                        <Card className='landing-card'
                                            style={{ height: '70h', backgroundColor: '#F1F6F5', alignContent: 'center', marginBlock: '2vh' }}
                                        >
                                            <Title level={2} className='landing-card-title'>
                                                {list.title}
                                            </Title>
                                            <Title level={5} className='landing-page-text'>
                                                {list.text}
                                            </Title>
                                            <Button
                                                type='text'
                                                className='float-left'
                                                onClick={() => decreaseCounter()}
                                            >
                                                <Title level={5}>
                                                    <ArrowLeftOutlined />&ensp;Back
                                                </Title>
                                            </Button>
                                            <Button
                                                type='text'
                                                className='float-right'
                                                onClick={() => increaseCounter()}
                                            >
                                                <Title level={5}>
                                                    Next&ensp;<ArrowRightOutlined />
                                                </Title>
                                            </Button>
                                        </Card>
                                    </Col>
                                    <Col span={16}>
                                        <Image
                                            className='landing-image'
                                            src={list.image}
                                            preview={false}
                                            style={{ width: '65vw', height: '79vh', borderRadius: '2vh' }}
                                        />
                                    </Col>
                                </React.Fragment> : null
                        )
                    })}
                </Row>
            </div>
        </div>
    );
};

export default Home;
