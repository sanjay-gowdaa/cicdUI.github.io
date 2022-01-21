import React, { useState } from 'react';
import { Card, Col, Image, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Connect from '../static/assets/connection.svg';
import Direct from '../static/assets/transmission.svg';
import BestPrize from '../static/assets/best.svg';
import LiveInfo from '../static/assets/agronomy.svg';
import Mission from '../static/assets/mission.svg';
import Handshake from '../static/assets/handshake.svg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Link, Text, Title } = Typography;

const Aim = () => {
    const [viewVideo, setVideo] = useState(false);
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <div id='aim'>
            <Modal
                visible={viewVideo}
                onCancel={() => setVideo(!viewVideo)}
                width={'95%'}
                className='about-us-video-modal'
                maskClosable={true}
                footer={null}
            >
                <iframe
                    title='about-us-video'
                    width='95%'
                    height='100%'
                    src='https://www.youtube.com/embed/p4CZAGgJ-wM?playlist=p4CZAGgJ-wM&loop=1&autoplay=1&mute=1'
                    allowFullScreen
                />
            </Modal>
            <Title className={`col-green ${customStyles.aimTitle}`}>{t('aim_page.title')}</Title>
            <img className='handshake-image' src={Handshake} alt='handshake' />
            <div className='aim-card-view'>
                <Row className='aim-card-row'>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Connect} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <div className='text'>
                                <Text className='col-white card-text'>{t('aim_page.aim_card_1')}</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Direct} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_2')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={LiveInfo} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_3')}</Text>
                        </Card>
                    </Col>
                </Row>
                <Row className='aim-card-row mobile-display-none'>
                    <Col span={8} className='card-col'>
                        <Card className={`aim-card-two ${customStyles.aimCard}`}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={BestPrize} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_4')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Connect} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <div className='text'>
                                <Text className='col-white card-text'>{t('aim_page.aim_card_5')}</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={`aim-card-two ${customStyles.aimCard}`}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Mission} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_6')}</Text>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Text className={customStyles.aimVideoLink}>{t('aim_page.video_link')} &nbsp;
                <Link onClick={() => setVideo(true)} style={{ textDecoration: 'underline' }}>
                    {t('aim_page.link_name')}
                </Link>
                .
            </Text>
        </div>
    );
};

export default Aim;
