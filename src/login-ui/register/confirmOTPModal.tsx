import React, {useState, useEffect} from 'react';
import { Modal, Typography, Input, Row, Col, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';

const { Text } = Typography;
const ConfirmOTPModal = ({showOTPModal, setShowOTPModal, currentType, history}: {showOTPModal: boolean, setShowOTPModal: Function, currentType: string, history: any}) => {
    const dispatch = useDispatch();
    const [curOtp, setCurOtp] = useState('')

    const onOtpChange = (event: any): void => setCurOtp(event.target.value)
    
    const registrationState = useSelector((state: RootState) => state.registration);
    const {otpError, formData} = registrationState;

    useEffect(() => {
        if (otpError.verified) {
            setShowOTPModal(!showOTPModal)
            return history.push(`register/${currentType.toLocaleLowerCase()}`);
        }
      }, [otpError.verified])

    return (
        <Modal
            wrapClassName='otp-modal'
            title={null}
            centered
            closable={false}
            maskClosable={false}
            visible={showOTPModal}
            footer={null}
            onCancel={() => setShowOTPModal(!showOTPModal)}
        >   
            <Row justify="center">
                <Col>
                    <Text strong>
                        Please enter 4 digit OTP number sent to your phone number/ email for verification
                    </Text>
                </Col>
                <Col>
                    <Input value={curOtp} placeholder="Enter 4 digit otp" onChange={onOtpChange} />
                </Col>
            </Row>
            {
                otpError.showError && (
                        <Row className='margin-t-1em'>
                            <Col span='24'>
                                <Alert message={otpError.errorMg} type="error" showIcon />
                            </Col>
                        </Row> )
            }

            <Row justify="center" className='margin-t-1em'>
                <Col>
                    <Button type="link" onClick={() => setShowOTPModal(!showOTPModal)}>
                        Cancel
                    </Button>
                    <Button 
                        type="primary" 
                        onClick={() => {
                            dispatch(confirmOTP( formData?.phone, curOtp))
                        }}
                    >
                        Proceed to profile verification
                    </Button>
                </Col>
            </Row>
        </Modal>
    )
}

export default ConfirmOTPModal;