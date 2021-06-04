import React from 'react';
import { Card, Col, Image, Row, Typography } from 'antd';

import Outline from '../static/assets/Outline.svg';
import Vision from '../static/assets/vision.svg';
import Philosophy from '../static/assets/philosophy.svg';
import { useTranslation } from 'react-i18next';

const { Paragraph, Title } = Typography;

const AboutUs = () => {
    const [t,i18n] = useTranslation('common')
    return (
        <div id="aboutUs">
            <Title className={`col-green ${t('about_us.styles.about-us-title')}`} level={2}>{t('about_us.title')}</Title>
            <img className="outline-image" src={Outline} />
            <Paragraph className={t('about_us.styles.outline-paragraph')}>
                {t('about_us.paragraph')}
            </Paragraph>
            <Row>
                <Col span={12}>
                    <Card className="vision-card">
                        <Image src={Vision} preview={false} />
                        <Title className="col-green card-title" level={3}>{t('about_us.vision_card.text')}</Title>
                        <Paragraph className={t('about_us.styles.card-paragraph')}>
                            {t('about_us.vision_card.description')}
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="vision-card">
                        <Image src={Philosophy} preview={false} />
                        <Title className="col-green card-title" level={3}>{t('about_us.philosophy_card.text')}</Title>
                        <Paragraph  className={t('about_us.styles.card-paragraph')}>
                            {t('about_us.philosophy_card.description')}
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <div className="vision-div">
                <Title className="col-green" level={3}>{t('about_us.title1')}</Title>
                <Paragraph className={t('about_us.styles.vision-paragraph')}>
                    {t('about_us.paragraph1')}
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUs;
