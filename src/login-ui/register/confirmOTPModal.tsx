import React, { useEffect, useState } from 'react';
import {
    Alert,
    Col,
    Input,
    Modal,
    Row,
    Space,
    Statistic,
    Typography
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { confirmOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';
import PrimaryBtn from '../../app-components/primaryBtn';

import "./register.scss";

const { Text, Title } = Typography;
const { Countdown } = Statistic

const ConfirmOTPModal = ({showOTPModal, setShowOTPModal, currentType, history}: {showOTPModal: boolean, setShowOTPModal: Function, currentType: string, history: any}) => {
    const dispatch = useDispatch();

    const registrationState = useSelector((state: RootState) => state.registration);
    const { otpError, formData } = registrationState;

    const otpTimer = Date.now() + 1000*60*10 ;

    var otp = '';
    const [inputOtp, setInputOtp] = useState({digit1: '', digit2: '', digit3: '', digit4: ''});

    useEffect(() => {
        if (otpError.verified) {
            setShowOTPModal(!showOTPModal);
            return history.push(`register/${currentType.toLocaleLowerCase()}`);
        }
    }, [otpError.verified]);

    const setFocusToNext = (event: any) => {
        if (event.target.value.length === 1) {
            event.target.nextSibling.focus();
        }
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
                    <Input
                        className="custom-otp-input-digits custom-input"
                        disabled={false}
                        maxLength={1}
                        onChange={(event: any) => setInputOtp({...inputOtp, digit1: event.target.value})}
                        onKeyUp={setFocusToNext}
                        type="text"
                        value={inputOtp.digit1}
                    />
                    <Input
                        className="custom-otp-input-digits custom-input"
                        disabled={(inputOtp.digit1 === '')? true : false}
                        maxLength={1}
                        onChange={(event: any) => setInputOtp({...inputOtp, digit2: event.target.value})}
                        onKeyUp={setFocusToNext}
                        type="text"
                        value={inputOtp.digit2}
                    />
                    <Input
                        className="custom-otp-input-digits custom-input"
                        disabled={(inputOtp.digit2 === '')? true : false}
                        maxLength={1}
                        onChange={(event: any) => setInputOtp({...inputOtp, digit3: event.target.value})}
                        onKeyUp={setFocusToNext}
                        type="text"
                        value={inputOtp.digit3}
                    />
                    <Input
                        className="custom-otp-input-digits custom-input"
                        disabled={(inputOtp.digit3 === '')? true : false}
                        maxLength={1}
                        onChange={(event: any) => setInputOtp({...inputOtp, digit4: event.target.value})}
                        type="text"
                        value={inputOtp.digit4}
                    />
                </Col>
            </Row>
            <Row>
                <Space>
                    <Text>Didn't receive OTP?</Text>
                    <Text className="custom-color-change"> Resend Code in </Text>
                    <Countdown
                        className="custom-color-change"
                        value={otpTimer} format="mm:ss"
                        onFinish={() => console.log("Resent OTP")}
                    />
                </Space>
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
                                otp = `${inputOtp.digit1} + ${inputOtp.digit2} + ${inputOtp.digit3} + ${inputOtp.digit4}`
                                dispatch(confirmOTP(formData?.number,otp));
                            }}
                            content="Proceed to profile verification"
                        />
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
};

export default ConfirmOTPModal;
