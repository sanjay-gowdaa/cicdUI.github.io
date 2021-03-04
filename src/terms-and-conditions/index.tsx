import React, { useEffect, useState } from 'react';
import { Alert, Collapse, Modal, Space } from 'antd';

import GeneralTerms from './generalTerms';
import BuyerTerms from './buyerTerms';
import SellerTerms from './sellerTerms';
import PrivacyPolicy from './privacyPolicy';

import PrimaryBtn from '../app-components/primaryBtn';
import DefaultBtn from '../app-components/defaultBtn';
import Header from '../header';
import Footer from '../footer';
import { routesMap } from '../constants';

import './termsAndConditions.scss';

const { Panel } = Collapse;
const { terms } = routesMap;

export const Terms = () => {
    return (
        <div className="t-and-c-page">
            <Header showActions={false} />
            <Collapse className="collapsable-t-and-c" defaultActiveKey={1}>
                <Panel header="General Terms" key="1">
                    <GeneralTerms />
                </Panel>
                <Panel header="Buyer Terms" key="2">
                    <BuyerTerms />
                </Panel>
                <Panel header="Seller Terms" key="3">
                    <SellerTerms />
                </Panel>
                <Panel header="Privacy Policy" key="4">
                    <PrivacyPolicy />
                </Panel>
            </Collapse>
            <Footer />
        </div>
    );
};

export const TAndCPopup = (props: any) => {
    const { initialDisplayType, viewTAndC } = props;
    const [visible, setVisible] = useState(viewTAndC);
    const [displayType, setDisplayType] = useState({general: true, buyer: false, seller: false});

    useEffect(() => {
        displayTerms(initialDisplayType);
    },[]);

    const tAndCRead = () => {
        //To be used to store the time stamp
        console.log("The person has read the terms and conditions.");
        setVisible(false);
    };

    const displayTerms = (type: string) => {
        const classToFocus = initialDisplayType + "-terms-button";
        const element = document.getElementsByClassName(classToFocus)[0].classList;

        switch(type) {
            case "general" : {
                element.add("focus-button-item");
                setDisplayType({general: true, buyer: false, seller: false});
                break;
            }
            case "buyer" : {
                setDisplayType({general: false, buyer: true, seller: false});
                element.add("focus-button-item");
                break;
            }
            case "seller" : {
                setDisplayType({general: false, buyer: false, seller: true});
                element.add("focus-button-item");
                break;
            }
            default: break;
        }

        (type !== initialDisplayType && element.remove("focus-button-item"));
    };

    return (
        <Modal
            wrapClassName="tAndCModal"
            className="custom-t-and-c-modal"
            visible={visible}
            title="Terms and Conditions"
            closable={false}
            footer={[
                <a className="view-full-page" href={terms} target="_blank">View Full Page</a>,
                <PrimaryBtn content="Okay" key="submit" onClick={tAndCRead} />
            ]}
        >
            <Space direction="vertical">
                <Alert
                    message="Reading all the Terms and Conditions is mandatory."
                    banner={true}
                    className="font-size-small"
                    type="info"
                    showIcon
                />
                <Space direction="horizontal">
                    <DefaultBtn
                        className="general-terms-button"
                        onClick={() => displayTerms("general")}
                        content="General Terms"
                    />
                    <DefaultBtn
                        className="buyer-terms-button"
                        onClick={() => displayTerms("buyer")}
                        content="Buyer"
                    />
                    <DefaultBtn
                        className="seller-terms-button"
                        onClick={() => displayTerms("seller")}
                        content="Seller"
                    />
                </Space>
                {displayType.general  && <GeneralTerms />}
                {displayType.buyer && <BuyerTerms />}
                {displayType.seller && <SellerTerms />}
            </Space>
        </Modal>
    );
};
