import React, { useEffect, useState } from 'react';
import {
    Alert,
    Col,
    Modal,
    Row,
    Space,
    Statistic,
    Typography
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { confirmOTP, resendOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';

import "./register.scss";

const { Text, Title } = Typography;
const { Countdown } = Statistic

const ConfirmOTPModal = ({showOTPModal, setShowOTPModal, currentType, history}: {showOTPModal: boolean, setShowOTPModal: Function, currentType: string, history: any}) => {
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);
    
    const { otpError, formData } = registrationState;
    const [otpTimer, setOtpTimer] = useState(0);
    const [resend, showResend] = useState(false);
    const [otpResent, setOtpResent] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (otpError.verified) {
            setShowOTPModal(!showOTPModal);
            return history.push(`register/${currentType.toLocaleLowerCase()}`);
        }
    }, [otpError.verified]);

    useEffect(() => {
        if(showOTPModal) {
            setOtpTimer(Date.now() + 1000*60);
        }
    }, [showOTPModal]);

    const retryOtpSend = () => {
        setOtpResent(true);
        dispatch(resendOTP());
    };

    return (
        <Modal
            wrapClassName="otp-modal"
            className="custom-otp-modal"
            title={<Title level={5}>OTP Verification</Title>}
            centered
            closable={false}
            maskClosable={false}
            visible={showOTPModal}
            footer={null}
            onCancel={() => setShowOTPModal(!showOTPModal)}
        >
            <Row justify="center">
                <Col>
                    <Text>
                        Please enter 4 digit OTP number sent to your phone number/ email
                    </Text>
                </Col>
                <Col>
                    <InputOtp setInput={setOtp} />
                </Col>
            </Row>
            <Row>
                <Space>
                    <Text>Didn't receive OTP?</Text>
                    {
                        !resend ? ( 
                            <>
                                <Text className="custom-color-change"> Resend Code in </Text>
                                <Countdown
                                className="custom-color-change"
                                value={otpTimer} format="mm:ss"
                                onFinish={() => showResend(true)}
                            />
                            </>
                        ) : (!otpResent ? <PrimaryBtn className="add-margin-bottom" onClick={retryOtpSend} content="Resend OTP" /> : null)
                    }
                </Space>
                <Alert
                    className="confirm-otp-modal-warning"
                    type="warning"
                    message="By entering the OTP you accept the terms and conditions 
                        and are ready to verify your profile"
                />
            </Row>
            {
                otpError.showError && (
                    <Row className="margin-t-1em">
                        <Col span="24">
                            <Alert message={otpError.errorMg} type="error" showIcon />
                        </Col>
                    </Row> )
            }

            <Row justify="center" className="margin-t-1em">
                <Col>
                    <Space>
                        <PrimaryBtn
                            onClick={() => {
                                dispatch(confirmOTP(formData?.number,otp));
                            }}
                            content="Submit OTP"
                        />
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
};

export default ConfirmOTPModal;
