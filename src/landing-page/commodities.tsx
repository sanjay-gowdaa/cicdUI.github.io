import React from 'react';
import { Image, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import StapleCrop from '../static/assets/stapleCrop.png';
import Pulses from '../static/assets/pulses.png';
import CashCrop from '../static/assets/cashCrop.png';
import OilSeed from '../static/assets/oilSeed.png';
import Wheat from '../static/assets/wheat-1.svg';
import Cardomom from '../static/assets/cardomom.jpg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Paragraph, Text, Title } = Typography;

const Commodities = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <div id='commodities'>
            <Title className={`col-green ${customStyles.commoditiesTitle}`} level={2}>
                {t('commodities_page.title')}
            </Title>
            <Paragraph className={customStyles.commoditiesParagraph}>
                {t('commodities_page.paragraph')}
            </Paragraph>
            <div className='commodities-list'>
                <Image
                    className='commodities-image'
                    src={StapleCrop}
                    preview={false}
                /><br />
                <Text className='commodities-name'>{t('commodities_page.commodities_name.1')}</Text>
            </div>
            <div className='commodities-list'>
                <Image
                    className='commodities-image'
                    src={Pulses}
                    preview={false}
                /><br />
                <Text className='commodities-name'>{t('commodities_page.commodities_name.2')}</Text>
            </div>
            <div className='commodities-list'>
                <Image
                    className='commodities-image'
                    src={CashCrop}
                    preview={false}
                /><br />
                <Text className='commodities-name'>{t('commodities_page.commodities_name.3')}</Text>
            </div>
            <div className='commodities-list'>
                <Image
                    className='commodities-image'
                    src={Cardomom}
                    preview={false}
                /><br />
                <Text className='commodities-name'>{t('commodities_page.commodities_name.4')}</Text>
            </div>
            <div className='commodities-list'>
                <Image
                    className='commodities-image'
                    src={OilSeed}
                    preview={false}
                /><br />
                <Text className='commodities-name'>{t('commodities_page.commodities_name.5')}</Text>
            </div>
            <Image className='wheat-image' src={Wheat} preview={false} />
        </div>
    );
};

export default Commodities;
