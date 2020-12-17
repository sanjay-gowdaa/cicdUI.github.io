import React from 'react';
import { Alert, Col, Modal, Row } from 'antd';

import CancelBtn from '../../app-components/cancelBtn';
import PrimaryBtn from '../../app-components/primaryBtn';

type propsModel = {
    registerResponse: {errorMg: string, verified: boolean}
    onConfirmRegister: Function,
    toggleShowConfirmation: Function,
    showConfirmation: boolean,
}

const RegisterConfirmation = (props: propsModel) => {
    const {onConfirmRegister, toggleShowConfirmation, showConfirmation, registerResponse} = props;
    return (
        <>
            <Modal
                visible={showConfirmation}
                centered
                title={null}
                footer={null}
                closable={false}
                maskClosable={false}
            >
                <p>Submit your details for verification?</p>
                {
                    registerResponse.errorMg && <Alert message={registerResponse.errorMg} type="error" />
                }
                <Row justify='end'>
                    <Col>
                        <CancelBtn
                            className='margin-l-r-1em'
                            onClick={() => toggleShowConfirmation(!showConfirmation)}
                        />
                        <PrimaryBtn
                            className='margin-l-r-1em'
                            onClick={() => onConfirmRegister()}
                            content="Yes"
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default RegisterConfirmation;
