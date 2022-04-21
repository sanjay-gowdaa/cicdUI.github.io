import React from 'react';
import { Typography, Row, Col } from 'antd';
import { Trans, useTranslation } from 'react-i18next';

import Nagappa from '../static/assets/Ellipse 1.png';
import Suma from '../static/assets/Ellipse 2.png';
import Sadananda from '../static/assets/Ellipse 3.png';
import SatishChandra from '../static/assets/Ellipse 6.png';
import Ganesh from '../static/assets/Ganesh.png';
import Guruprasad from '../static/assets/Ellipse 4.png';
import { LandingDivider } from '../app-components/landingDivider';

const { Paragraph, Title } = Typography;

const Team = () => {
    const { t } = useTranslation('common');

    return (
        <div id='team'>
            <Title className='teamTitle'>
                {t('our_team.title')}
            </Title>
            <div className='teamWrapper'>
                <div className='Founders_sec'>
                    <Title level={4} className='FoundersTitle'>{t('our_team.founders.title')}</Title>
                    <Row className='FoundersRow'>
                        <Col span={6}><img src={Sadananda} alt='Sadananda' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.founders.name.1')}</Title>
                            <p>{t('our_team.founders.designation.1')}  {t('our_team.founders.subDesignation.1')}</p>
                            <Paragraph className='para'>
                                <Trans
                                    i18nKey='our_team.founders.description.1'
                                    components={{ italic: <i />, bold: <strong /> }}
                                /></Paragraph>
                        </Col>
                    </Row>
                    <Row className='FoundersRow'>
                        <Col span={6}><img src={Nagappa} alt='Nagappa' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.founders.name.2')}</Title>
                            <p>{t('our_team.founders.designation.2')} {t('our_team.founders.subDesignation.2')}</p>
                            <Paragraph className='para'>{t('our_team.founders.description.2')}</Paragraph>
                        </Col>
                    </Row>
                    <Row className='FoundersRow'>
                        <Col span={6}><img src={Suma} alt='Suma' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.founders.name.3')}</Title>
                            <p>{t('our_team.founders.designation.3')}</p>
                            <Paragraph className='para'>{t('our_team.founders.description.3')}</Paragraph>
                        </Col>
                    </Row>
                </div>
                <div className='Management_sec'>
                    <Title level={4} className='FoundersTitle'>{t('our_team.advisors.title')}</Title>
                    {/* <Row className='ManagementRow'>
                        <Col span={6} xs={24} md={6}><img src={SatishChandra} alt='SatishChandra' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.advisors.name.1')}</Title>
                            <p>{t('our_team.advisors.designation.1')}</p>
                            <Paragraph className='para'>{t('our_team.advisors.description.1')}</Paragraph>
                        </Col>
                    </Row> */}
                    <Row className='ManagementRow'>
                        <Col span={6} xs={24} md={6}><img src={Ganesh} alt='Ganesh' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.advisors.name.2')}</Title>
                            <p>{t('our_team.advisors.designation.2')}</p>
                            <Paragraph className='para'>{t('our_team.advisors.description.2')}</Paragraph>
                        </Col>
                    </Row>
                    {/* <Row className='ManagementRow'>
                        <Col span={6} xs={24} md={6}><img src={Guruprasad} alt='Guruprasad' /></Col>
                        <Col span={18} xs={24} md={18} className='FounderPara'>
                            <Title level={5}>{t('our_team.advisors.name.3')}</Title>
                            <p>{t('our_team.advisors.designation.3')}</p>
                            <Paragraph className='para'>{t('our_team.advisors.description.3')}</Paragraph>
                        </Col>
                    </Row> */}
                </div>
            </div>
            <LandingDivider className='pageDivider' />
        </div>
    );
};

export default Team;
