import React, { useState } from 'react';
import { Button, Checkbox, Modal, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import TradeSummary from './tradeSummary';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import { getTimeStamp } from '../../app-components/utils';

const { Text, Title } = Typography;

const AcceptMatch = (props: any) => {
    const { cropDetails } = props;
    const dispatch = useDispatch();
    const [viewAcceptAgreement, setViewAcceptAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const [agreementNumber, setAgreementNumber] = useState(1);
    const [timeStamp, setTimeStamp] = useState({date: "", time: ""});

    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius"
                onClick={() => setViewAcceptAgreement(true)}
                content="Accept"
            />
            <Modal 
                visible={viewAcceptAgreement}
                title={<Title level={3}>Agreement To Sell</Title>}
                onCancel={() => setViewAcceptAgreement(!viewAcceptAgreement)}
                footer = {[
                    <PrimaryBtn
                        onClick={() => {
                            console.log("otp", otp);
                            //Dispatch method which confirms the otp.
                            // timeStamp to be stored in SellerStateModel
                            setTimeStamp(dispatch(getTimeStamp));
                            setViewAcceptAgreement(!viewAcceptAgreement);
                            //Download pdf of the Purchase Agreement
                        }}
                        content="Agree"
                    />
                ]}
            >
                <Text style={{float:"right"}}>Application no: {agreementNumber}</Text>
                <TradeSummary cropDetails={cropDetails} />
                <Checkbox className="custom-checkbox">
                    I have read the
                    <a href="/agreement" target="_blank" style={{padding: "0.2em"}}>
                        Purchaser Agreement
                    </a>
                    and agree to digitally sign the same.
                </Checkbox>
                {/* If showPurchaser is true then send otp to the user. */}
                <Text>Please enter the Digital OTP recieved</Text>
                <InputOtp setInput={setOtp} />
            </Modal>
        </>
    );
};

export default AcceptMatch;
