import React from 'react';
import { Card, Col, Image, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Outline from '../static/assets/Outline.svg';
import Vision from '../static/assets/vision.svg';
import Philosophy from '../static/assets/philosophy.svg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Paragraph, Title } = Typography;

const AboutUs = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;

    return (
        <div id="aboutUs">
            <Title className={`col-green ${customStyles.aboutUsTitle}`} level={2}>
                {t('about_us.title')}
            </Title>
            <img className="outline-image" src={Outline} />
            <Paragraph className={customStyles.outlineParagraph}>
                {t('about_us.paragraph')}
            </Paragraph>
            <Row>
                <Col span={12}>
                    <Card className="vision-card">
                        <Image className="about-us-card-image" src={Vision} preview={false} />
                        <Title className="col-green card-title" level={3}>
                            {t('about_us.vision_card.text')}
                        </Title>
                        <Paragraph className={customStyles.cardParagraph}>
                            {t('about_us.vision_card.description')}
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="vision-card phylosophy-card">
                        <Image className="about-us-card-image" src={Philosophy} preview={false} />
                        <Title className="col-green card-title" level={3}>
                            {t('about_us.philosophy_card.text')}
                        </Title>
                        <Paragraph className={customStyles.cardParagraph}>
                            {t('about_us.philosophy_card.description')}
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <div className="vision-div">
                <Title className="col-green vision-div-title" level={3}>{t('about_us.title1')}</Title>
                <Paragraph className={customStyles.visionParagraph}>
                    {t('about_us.paragraph1')}
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUs;
