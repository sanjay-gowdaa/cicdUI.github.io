import React from 'react';
import { Image, Space, Typography } from 'antd';

import StapleCrop from '../static/assets/stapleCrop.png';
import Pulses from '../static/assets/pulses.png';
import CashCrop from '../static/assets/cashCrop.png';
import Spices from '../static/assets/spices.png';
import OilSeed from '../static/assets/oilSeed.png';
import Wheat from '../static/assets/wheat-1.svg';

const { Paragraph, Text, Title } = Typography;

const Commodities = () => {
    return (
        <div id="commodities">
            <Title className="col-green" level={2}>Commodities we facilitate</Title>
            <Paragraph className="commodities-paragraph">
                VikasBandhu focus is currently limited to the non perishable agricultural produce
                from Farmers and Farmer Self help groups. The coverage initially is targetted in 
                Karnataka covering the  major crops native to this region. The scope of produce 
                is intended/limited to be below categories at this point.
            </Paragraph>
            <Space direction="horizontal" size="large">
                <div className="commodities-list">
                    <Image
                        className="commodities-image"
                        width={150}
                        height={150}
                        src={StapleCrop}
                        preview={false}
                    />
                    <Text className="commodities-name">Staple Crops</Text>
                </div><div className="commodities-list">
                    <Image
                        className="commodities-image"
                        width={150}
                        height={150}
                        src={Pulses}
                        preview={false}
                    />
                    <Text className="commodities-name">Pulses</Text>
                </div><div className="commodities-list">
                    <Image
                        className="commodities-image"
                        width={150}
                        height={150}
                        src={CashCrop}
                        preview={false}
                    />
                    <Text className="commodities-name">Cash Crops</Text>
                </div><div className="commodities-list">
                    <Image
                        className="commodities-image"
                        width={150}
                        height={150}
                        src={Spices}
                        preview={false}
                    />
                    <Text className="commodities-name">Spices</Text>
                </div><div className="commodities-list">
                    <Image
                        className="commodities-image"
                        width={150}
                        height={150}
                        src={OilSeed}
                        preview={false}
                    />
                    <Text className="commodities-name">Oil Seeds</Text>
                </div>
            </Space>
            <Image className="wheat-image" src={Wheat} preview={false} />
        </div>
    );
};

export default Commodities;
