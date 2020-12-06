import React from 'react';
import { Modal, Button, Row, Col, Alert } from 'antd';

type propsModel = {
    registerResponse: {errorMg: string, verified: boolean}
    onConfirmRegister: Function,
    toggleShowConfirmation: Function,
    showConfirmation: boolean,
}

const RegisterConfirmation = (props: propsModel) => {
    const {onConfirmRegister, toggleShowConfirmation, showConfirmation, registerResponse} = props
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
                        <Button className='margin-l-r-1em' onClick={() => toggleShowConfirmation(!showConfirmation)}>
                            Cancel
                        </Button>
                        <Button type="primary" className='margin-l-r-1em' onClick={() => onConfirmRegister()}>
                            Yes
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default RegisterConfirmation;