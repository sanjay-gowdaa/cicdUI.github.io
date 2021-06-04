import React from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Tractor from '../static/assets/tractor.svg';
import Network from '../static/assets/network.svg';
import Rupee from '../static/assets/rupee.svg';
import Sync from '../static/assets/sync.svg';
import Lorry from '../static/assets/lorry.svg';
import SocialCare from '../static/assets/social-care.svg';
import Nature from '../static/assets/nature.svg';

const { Text, Title } = Typography;

const Ecosystem = () => {
    const [ t, i18n ] = useTranslation('common');

    return (
        <div id="ecosystem">
            <Image className="tractor-image" src={Tractor} preview={false} />
            <div className={t('ecosystem_page.styles.ecosystem-content')}>
                <Title className={`col-green ${t('ecosystem_page.styles.ecosystem-title')}`} level={2}>{t('ecosystem_page.title')}</Title>
                <Row>
                    <Col span={2}>
                        <Space direction="vertical" className="bulletin-image" size="large">
                        <Image className="first-bulletin-image" src={Network} preview={false} />
                        <Image src={Rupee} preview={false} />
                        <Image src={Sync} preview={false} />
                        <Image src={Lorry} preview={false} />
                        <Image className="last-bulletin-image" src={SocialCare} preview={false} />
                        </Space>
                    </Col>
                    <Col>
                        <Space direction="vertical" className={t('ecosystem_page.styles.bulletin-text')} size="small">
                        <Text className="bulletin-points">
                        {t('ecosystem_page.text_1')}<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>{t('ecosystem_page.text_2')}<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>{t('ecosystem_page.text_3')}<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>{t('ecosystem_page.text_4')}<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>{t('ecosystem_page.text_5')}
                        </Text>
                        </Space>
                    </Col>
                </Row>
                <img className="nature-image" src={Nature} alt="nature-image" />
            </div>
        </div>
    );
};

export default Ecosystem;
