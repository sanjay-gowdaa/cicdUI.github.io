import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import StapleCrops from '../static/assets/Rectangle 97.png'; 
import Pulses from '../static/assets/Rectangle 98.png'; 
import CashCrops from '../static/assets/Rectangle 99.png'; 
import Spices from '../static/assets/Rectangle 100.png'; 
import OilSeeds from '../static/assets/Rectangle 101.png'; 
import { LandingDivider } from '../app-components/landingDivider';

const { Paragraph, Title } = Typography;

const Commodities = () => {
    const { t } = useTranslation('common');

    return (
        <div id='commodities'>
            <div className='commodities-wrapper'>
            <Title level={2} className='commoditiesTitle'>
            {t('commodities_page.title')}
            </Title>
            <Paragraph className='commoditiesParagraph'>{t('commodities_page.paragraph')}</Paragraph>
            <div className='CropImages_sec'>
                <div>
                    <img src={StapleCrops} alt='StapleCrops'/>
                    <p>{t('commodities_page.commodities_name.1')}</p>
                </div>
                <div>
                    <img src={Pulses}   alt='Pulses'/>
                    <p>{t('commodities_page.commodities_name.2')}</p>
                </div>
                <div>
                    <img src={CashCrops} alt='CashCrops'/>
                    <p>{t('commodities_page.commodities_name.3')}</p>
                </div>
                <div>
                    <img src={Spices} alt='Spices'/>
                    <p>{t('commodities_page.commodities_name.4')}</p>
                </div>
                <div>
                    <img src={OilSeeds} alt='OilSeeds'/>
                    <p>{t('commodities_page.commodities_name.5')}</p>
                </div>
            </div>
            <LandingDivider className='pageDivider'/>
        </div>
        </div>
    );
};

export default Commodities;
