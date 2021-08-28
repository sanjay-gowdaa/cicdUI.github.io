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
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;

    return (
        <div id="ecosystem">
            <Image className="tractor-image" src={Tractor} preview={false} />
            <div className={customStyles.ecosystemContent}>
                <Title className={`col-green ${customStyles.ecosystemTitle}`} level={2}>
                    {t('ecosystem_page.title')}
                </Title>
                <Space
                    direction="vertical"
                    className={customStyles.bulletinText}
                    style={{height: "20rem"}}
                    size="small"
                >
                    <Text>
                        <Image style={{paddingRight: '1rem'}} src={Network} preview={false} />
                        {t('ecosystem_page.text_1')}<br/>
                    </Text>
                    <Text>
                        <Image style={{paddingRight: '1rem'}} src={Rupee} preview={false} />
                        {t('ecosystem_page.text_2')}<br/>
                    </Text>
                    <Text>
                        <Image style={{paddingRight: '1.5rem'}} src={Sync} preview={false} />
                        {t('ecosystem_page.text_3')}<br/>
                    </Text>
                    <Text>
                        <Image style={{paddingRight: '1rem'}} src={Lorry} preview={false} />
                        {t('ecosystem_page.text_4')}<br/>
                    </Text>
                    <Text>
                        <Image style={{paddingRight: '1rem'}} src={SocialCare} preview={false} />
                        {t('ecosystem_page.text_5')}
                    </Text>
                </Space>
                <img className="nature-image" src={Nature} alt="nature" />
            </div>
        </div>
    );
};

export default Ecosystem;
