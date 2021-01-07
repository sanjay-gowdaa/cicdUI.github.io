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

const { Text, Title } = Typography;
const { Countdown } = Statistic

const ConfirmOTPModal = ({showOTPModal, setShowOTPModal, currentType, history}: {showOTPModal: boolean, setShowOTPModal: Function, currentType: string, history: any}) => {
    const dispatch = useDispatch();
    const [curOtp, setCurOtp] = useState('');

    const onOtpChange = (event: any): void => setCurOtp(event.target.value);

    const registrationState = useSelector((state: RootState) => state.registration);
    const { otpError, formData } = registrationState;

    const otpTimer = Date.now() + 1000*60*10 ;

    useEffect(() => {
        if (otpError.verified) {
            setShowOTPModal(!showOTPModal);
            return history.push(`register/${currentType.toLocaleLowerCase()}`);
        }
    }, [otpError.verified]);

    return (
        <Modal
            wrapClassName="otp-modal"
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
                    <Input value={curOtp} placeholder="Enter 4 digit otp" onChange={onOtpChange} />
                </Col>
            </Row>
            <Row>
                <Space>
                    <Text>Didn't recieve OTP?</Text>
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
                                dispatch(confirmOTP(formData?.number, curOtp));
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
