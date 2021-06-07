import React, { useState } from 'react';
import { Card, Col, Image, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Connect from '../static/assets/connection.svg';
import Direct from '../static/assets/transmission.svg';
import BestPrize from '../static/assets/best.svg';
import LiveInfo from '../static/assets/agronomy.svg';
import Mission from '../static/assets/mission.svg';
import Handshake from '../static/assets/handshake.svg';

const { Link, Text, Title } = Typography;

const Aim = () => { 
    const [viewVideo, setVideo] = useState(false);
    const [ t,i18n ] = useTranslation('common');

    return (
        <div id="aim">
            <Modal
                visible={viewVideo}
                onCancel={() => setVideo(!viewVideo)}
                width={"95%"}
                className="about-us-video-modal"
                maskClosable={true}
                footer={null}
            >
                <iframe
                    width="95%"
                    height="100%"
                    src="https://www.youtube.com/embed/p4CZAGgJ-wM?playlist=p4CZAGgJ-wM&loop=1&autoplay=1&mute=1"
                    allowFullScreen
                />
            </Modal>
            <Title className={`col-green ${t("aim_page.styles.aim-title")}`}>{t('aim_page.title')}</Title>
            <img className="handshake-image" src={Handshake} alt="handshake-image" />
            <Row className="aim-card-row">
                <Col span={8}>
                    <Card className={t('aim_page.styles.aim-card')}>
                        <div className="hex1"></div>
                        <div className="hex2">
                            <Image className="icon-inside-hex" src={Connect} preview={false} />
                        </div>
                        <div className="hex3"></div>
                        <Text className="col-white">{t('aim_page.aim_card_1')}</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className={t('aim_page.styles.aim-card')}>
                        <div className="hex1"></div>
                        <div className="hex2">
                            <Image className="icon-inside-hex" src={Direct} preview={false} />
                        </div>
                        <div className="hex3"></div> 
                        <Text className="col-white">{t('aim_page.aim_card_2')}</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className={t('aim_page.styles.aim-card')}>
                        <div className="hex1"></div>
                        <div className="hex2">
                            <Image className="icon-inside-hex" src={BestPrize} preview={false} />
                        </div>
                        <div className="hex3"></div> 
                        <Text className="col-white">{t('aim_page.aim_card_3')}</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className={t('aim_page.styles.aim-card')} style={{float: "right", marginRight: "5rem"}}>
                        <div className="hex1"></div>
                        <div className="hex2">
                            <Image className="icon-inside-hex" src={LiveInfo} preview={false} />
                        </div>
                        <div className="hex3"></div>
                        <Text className="col-white">{t('aim_page.aim_card_4')}</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className={t('aim_page.styles.aim-card')}>
                        <div className="hex1"></div>
                        <div className="hex2">
                            <Image className="icon-inside-hex" src={Mission} preview={false} />
                        </div>
                        <div className="hex3"></div>
                        <Text className="col-white">{t('aim_page.aim_card_5')}</Text>
                    </Card>
                </Col>
            </Row>
            <Text className={t('aim_page.styles.aim-video-link')}>{t('aim_page.video_link')} &nbsp;
                <Link onClick={() => setVideo(true)} style={{textDecoration: "underline"}}>
                    {t('aim_page.link_name')}
                </Link>
                .
            </Text>
        </div>
    );
};

export default Aim;
