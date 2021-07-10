import React from 'react';
import { Card, Col, Image, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Nagappa from '../static/assets/nagappa.png';
import Suma from '../static/assets/suma.png';
import Sadananda from '../static/assets/sadananda.png';
import Chikkaramu from '../static/assets/Chikkaramu.jpg';
import Sachin from '../static/assets/Sachin.jpg';
import CVKulkarni from '../static/assets/CVKulkarni.jpg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Text, Title } = Typography;

const Team = () => {
    const [ t, i18n ] =useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;

    return (
        <div id="team">
            <Title className="col-green team-title" level={2}>{t('our_team.title')}</Title>
            <div className="management-team">
                <Title className="col-green margin-none team-sub-title" level={3}>{t('our_team.subtitle')}</Title>
                <Row>
                    <Col span={8} className="team-column">
                        <div className="management-our-team nagappa">
                            <img className="management-image" src={Nagappa} />
                            <Title className="person-name" level={4}>{t('our_team.name.1')}</Title>
                            <Text className="designation">{t('our_team.designation.1')}</Text>
                        </div>
                    </Col>
                    <Col span={8} className="team-column">
                        <div className="management-our-team suma">
                            <img className="management-image" src={Suma} />
                            <Title className="person-name" level={4}>{t('our_team.name.2')}</Title>
                            <Text className="designation">{t('our_team.designation.2')}</Text>
                        </div>
                    </Col>
                    <Col span={8} className="team-column">
                        <div className="management-our-team sadananda">
                            <img className="management-image" src={Sadananda} />
                            <Title className="person-name" level={4}>{t('our_team.name.3')}</Title>
                            <Text className="designation">{t('our_team.designation.3')}</Text>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="advisors-team">
                <Title className="col-green margin-none team-sub-title" level={3}>{t('our_team.advisors.title')}</Title>
                <Row>
                    <Col span={8} className="team-column">
                        <Card className={customStyles.advisorsCard}>
                            <img src={Chikkaramu} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.1')}</Title>
                            <Text className="description">{t('our_team.advisors.description.1')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className="team-column">
                        <Card className={`advisor-card-two ${customStyles.advisorsCard}`}>
                            <img src={Sachin} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.2')}</Title>
                            <Text className="description">{t('our_team.advisors.description.2')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className="team-column">
                        <Card className={`advisor-card-three ${customStyles.advisorsCard}`}>
                            <img src={CVKulkarni} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.3')}</Title>
                            <Text className="description">{t('our_team.advisors.description.3')}</Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Team;
