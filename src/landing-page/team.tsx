import React from 'react';
import { Card, Col, Image, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Nagappa from '../static/assets/nagappa.png';
import Suma from '../static/assets/suma.png';
import Sadananda from '../static/assets/sadananda.png';
import Chikkaramu from '../static/assets/Chikkaramu.jpg';
import Sachin from '../static/assets/Sachin.jpg';
import CVKulkarni from '../static/assets/CVKulkarni.jpg';

const { Text, Title } = Typography;

const Team = () => {
    const [ t, i18n ] =useTranslation('common');

    return (
        <div id="team">
            <Title className="col-green" level={2}>{t('our_team.title')}</Title>
            <div className="management-team">
                <Title className="col-green margin-none" level={3}>{t('our_team.subtitle')}</Title>
                <Space direction="horizontal">
                    <div className="management-our-team">
                        <Image src={Nagappa} preview={false} />
                        <Title className="person-name" level={4}>{t('our_team.name.1')}</Title>
                        <Text>{t('our_team.designation.1')}</Text>
                    </div>
                    <div className="management-our-team">
                        <Image src={Suma} preview={false} />
                        <Title className="person-name suma" level={4}>{t('our_team.name.2')}</Title>
                        <Text className="suma">{t('our_team.designation.2')}</Text>
                    </div>
                    <div className="management-our-team">
                        <Image src={Sadananda} preview={false} />
                        <Title className="person-name" level={4}>{t('our_team.name.3')}</Title>
                        <Text>{t('our_team.designation.3')}</Text>
                    </div>
                </Space>
            </div>
            <div className="advisors-team">
                <Title className="col-green margin-none" level={3}>{t('our_team.advisors.title')}</Title>
                <Row>
                    <Col span={8}>
                        <Card className={t('our_team.advisors.styles.advisors-card')}>
                            <Image src={Chikkaramu} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.1')}</Title>
                            <Text>{t('our_team.advisors.description.1')}
                            </Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className={t('our_team.advisors.styles.advisors-card')}>
                            <Image src={Sachin} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.2')}</Title>
                            <Text>{t('our_team.advisors.description.2')}
                            </Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className={t('our_team.advisors.styles.advisors-card')}>
                            <Image src={CVKulkarni} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>{t('our_team.advisors.name.3')}</Title>
                            <Text>{t('our_team.advisors.description.3')}
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Team;
