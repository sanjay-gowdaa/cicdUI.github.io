import React from 'react';
import { Typography } from 'antd';

import './termsAndConditions.scss';

const { Title, Paragraph } = Typography;

const GeneralTerms = () => {
    return (
        <div className="general-terms">
            <Title className="font-size-small" level={5}>General Terms</Title>
            <Paragraph>
                Vikasbandhu is the trademark owned by SamparkBindhu Solutions Private Limited
                ("<b>SamparkBindhu</b>"). All back- end support for the application has been created 
                and managed by SamparkBindhu Solutions Private Limited and Vikasbandhu is the 
                user interface (" also herein after referred as <b>Platform</b>") .	
            </Paragraph>
            <Paragraph>
                Platform is only a facilitator between the users who are selling agriculture 
                produce grown on agricultural land and (<b>Seller[s]</b>) and users interested in 
                purchasing such agriculture produce (<b>Buyer[s]</b>), to help strike a mutually 
                agreeable deal and has no role in trading or warehousing and is not the authority 
                on the quality of the agriculture produce available on the Platform.
            </Paragraph>
            <Paragraph>
                By accessing and registering  with the Platform,  the Users confirm that the Users 
                are in agreement with and bound by the terms of service contained in the Terms and 
                Conditions outlined below. These terms apply to the entire website, mobile 
                application and any mail exchange that may happen during course of business 
                between the Users and the Platform.
            </Paragraph>
            <Paragraph>
                By using the Platform, the Users are accepting these terms and conditions in full 
                and shall be legally bound to said terms and conditions, so the User should read 
                them carefully. Access to and use of Platform depends solely on the acceptance of 
                these Terms and Conditions.
            </Paragraph>
        </div>
    );
};

export default GeneralTerms;
