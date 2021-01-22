import React, { useState } from 'react';
import { Checkbox, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TradeSumary from './tradeSummary';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import { sendOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';
import { saveTimeStamp } from '../../store/buyerReducer/actions';

const { Text, Title } = Typography;

const ConnectMatch = (props: any) => {
    const {cropDetails} = props;  
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.loginUser);
    const [viewConnectAgreement, setConnectAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const agreementNumber = `PA_${userState.id}_${cropDetails.sellerId}_1`;// Temp
    const [isAgreed, setAgreed] = useState(false); 
    
    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius"
                onClick={() => setConnectAgreement(true)}
                content="Connect"
            />
            <Modal
                visible={viewConnectAgreement}
                title={<Title level={3}>Agreement To Buy</Title>}
                onCancel={() => setConnectAgreement(!viewConnectAgreement)}
                footer={[
                    <PrimaryBtn
                        onClick={() => {
                            console.log("otp", otp);
                            //Dispatch method which confirms otp
                            //timeStamp to be stored in BuyerStateModel
                            dispatch(saveTimeStamp);
                            setConnectAgreement(!viewConnectAgreement);
                            //Download pdf of the Purchase Agreement
                        }}
                        content="Agree"
                    />
                ]}
            >
                <Text style={{float: "right"}}>Application no: {agreementNumber}</Text>
                <TradeSumary cropDetails={cropDetails} />
                <Checkbox
                    className="custom-checkbox"
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${userState.username}`));
                            setAgreed(true);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href="/agreement" target="_blank" style={{padding: "0.2em"}}>
                        Purchase Agreement
                    </a>
                    and agree to digitally sign the same using OTP.
                </Checkbox>
                { isAgreed && 
                    <>
                        <Text>Please enter the Digital OTP recieved</Text>
                        <InputOtp setInput={setOtp} />
                    </>
                }
            </Modal>
        </>
    );
};

export default ConnectMatch;
