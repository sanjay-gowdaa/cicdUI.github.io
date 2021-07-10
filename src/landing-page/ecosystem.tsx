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
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Text, Title } = Typography;

const Ecosystem = () => {
    const [ t, i18n ] = useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;

    return (
        <div id="ecosystem">
            <Image className="tractor-image" src={Tractor} preview={false} />
            <div className={customStyles.ecosystemContent}>
                <Title className={`col-green ${customStyles.ecosystemTitle}`} level={2}>
                    {t('ecosystem_page.title')}
                </Title>
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
                    <Col className="bulletin-col">
                        <Space
                            direction="vertical"
                            className={customStyles.bulletinText}
                            size="small"
                        >
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
