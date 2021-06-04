import React from 'react';
import { Card, Col, Image, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import SellerIcon from '../static/assets/man.svg';
import BuyerIcon from '../static/assets/teacher.svg';
import Transport from '../static/assets/transport.svg';

const { Paragraph, Title } = Typography;

const User = () => {
    const [ t,i18n ] = useTranslation('common');

    return (
        <div id="users">
            <Title className={`col-green ${t('users_page.styles.user-title')}`} level={2}>{t('users_page.title')}</Title>
            <Row style={{paddingLeft: "15vw"}}>
                <Col span={8} className="user-column">
                    <Card className="user-card">
                        <Title className="col-green" level={2}>{t('users_page.user_card1.title')}</Title>
                        <Paragraph className={t('users_page.styles.card-subtitle')}>{t('users_page.user_card1.subtitle')}</Paragraph>
                        <Image width={125} height={125} src={SellerIcon} preview={false} />
                        <Paragraph className={t('users_page.styles.card-text')}>
                            {t('users_page.user_card1.text')}
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={8} className="user-column">
                    <Card className={t('users_page.styles.user-card')}>
                        <Title className="col-green" level={2}>{t('users_page.user_card2.title')}</Title>
                        <Paragraph className={t('users_page.styles.card-subtitle')}>{t('users_page.user_card2.subtitle')}</Paragraph>
                        <Image width={125} height={125} src={BuyerIcon} preview={false} />
                        <Paragraph className={t('users_page.styles.card-text')}>
                        {t('users_page.user_card2.text')}       
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Image className="transport-image" src={Transport} preview={false} />
        </div>
    );
};

export default User;
