import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';

type propsModel = {
    onConfirmRegister: Function,
    toggleShowConfirmation: Function,
    showConfirmation: boolean,
}

const RegisterConfirmation = (props: propsModel) => {
    const {onConfirmRegister, toggleShowConfirmation, showConfirmation} = props
    return (
        <>
            <Modal
                visible={showConfirmation}
                onOk={() => onConfirmRegister()}
                onCancel={() => toggleShowConfirmation(!showConfirmation)}
                centered
                title={null}
                footer={null}
                closable={false}
                maskClosable={false}
            >
                <p>Submit your details for verification?</p>
                <Row justify='end'>
                    <Col>
                        <Button className='margin-l-r-1em'>
                            Cancel
                        </Button>
                        <Button type="primary" className='margin-l-r-1em'>
                            Yes
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default RegisterConfirmation;