import React from 'react';
import { Alert, Col, Modal, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { setKycUpdateMsg } from '../store/loginReducer/actions';
import CancelBtn from '../app-components/cancelBtn';
import PrimaryBtn from '../app-components/primaryBtn';

const { Text } = Typography;

const ConfirmationMessage = (props: any) => {
    const { disableSave, isSave, onConfirm, response, setConfirmation, showConfirmation } = props;
    const dispatch = useDispatch();

    return (
        <Modal
            visible={showConfirmation}
            centered
            title={null}
            footer={null}
            closable={false}
            maskClosable={false}
        >
            {isSave ?
                <Text>Save and submit your details for verification?</Text> :
                <Text>The data will not be saved. Are you sure you want to cancel?</Text>
            }
            {response.kycErrorMsg && !disableSave &&
                <Alert message={response.kycErrorMsg} type='error' />
            }
            <Row justify='end'>
                {!isEmpty(response.kycErrorMsg) ?
                    <Col>
                        <PrimaryBtn
                            className='margin-l-r-1em margin-t-1em'
                            onClick={() => {
                                window.history.back();
                                dispatch(setKycUpdateMsg(''));
                            }}
                            content='OK'
                        />
                    </Col> :
                    <Col>
                        <CancelBtn
                            className='margin-l-r-1em margin-t-1em'
                            onClick={() => setConfirmation(!showConfirmation)}
                        />
                        <PrimaryBtn
                            className='margin-l-r-1em margin-t-1em'
                            onClick={() => isSave ? onConfirm() : window.history.back()}
                            content='Yes'
                        />
                    </Col>
                }
            </Row>
        </Modal>
    );
};

export default ConfirmationMessage;
