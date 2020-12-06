import React from 'react';
import { Modal, Button, Row, Col } from 'antd';

type propsModel = {
    showSubmitMsgPopup: boolean,
    history: any
}

const RequestSubmittedPopup = (props: propsModel) => {
    const {showSubmitMsgPopup, history} = props
    return (
        <>
            <Modal
                visible={showSubmitMsgPopup}
                centered
                title={null}
                footer={null}
                closable={false}
                maskClosable={false}
            >
                <p>Information submitted successfully</p>
                <p>Your profile will be verified by Vikasbandhu Please login to continue</p>
                <Row justify='end'>
                    <Col>
                        <Button type="primary" className='margin-l-r-1em' onClick={() => history.push('/')}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default RequestSubmittedPopup;