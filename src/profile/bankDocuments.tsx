import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { isEmpty, toUpper } from 'lodash';

import { bankDocumentsList, bankFieldValue } from './constants';
import {
    confirmAccountValidator,
    validateInputField,
    ViewDocument
} from './utils';

import { UserTypes } from '../store/genericTypes';
import { getUserFiles } from '../store/loginReducer/actions';
import UploadDocument from '../app-components/uploadDocument';

const { Text } = Typography;

type BankDocumentsProps = {
    bank_doc: any;
    bankInfo: any,
    isAddClicked: boolean;
    isChangedClicked: boolean;
    kycFlag: string;
    setDisableSave: Function;
    userType: UserTypes;
    showConfirmAccountNumber:any;
    setShowConfirmAccountNumber:any;
};

const BankDocuments = (props: BankDocumentsProps) => {
    const { bank_doc, bankInfo, isAddClicked, isChangedClicked, kycFlag, setDisableSave, userType,showConfirmAccountNumber,setShowConfirmAccountNumber} = props;
    const dispatch = useDispatch();
    const [showDocument, setShowDocument] = useState(false);
    const [changeDocument, setChangeDocument] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [isPDF, setPDF] = useState(false);
   
    const [accountNumber, setAccountNumber] = useState('');

    return (
        <React.Fragment>
            {bankDocumentsList.map((list) => {
                const value = bankFieldValue(list.name, bankInfo) || '';
                const displayWhenEmpty = (isEmpty(bank_doc) && (isAddClicked || isChangedClicked));
                const displayWhenChange = !isEmpty(bank_doc) && changeDocument;

                return (
                    <div
                        className={
                            kycFlag === 'incomplete' &&
                                userType === UserTypes.SELLER &&
                                list.name !== 'upi_id' ? `kyc-required` : ``
                        }
                    >
                        <Form.Item className='margin-zero'>
                            {!list.upload ?
                                <React.Fragment>
                                    <Form.Item
                                        labelCol={{ span: 13 }}
                                        label={
                                            <span className='kyc-form-label'>
                                                {kycFlag === 'incomplete' && userType === UserTypes.SELLER && list.name !== 'upi_id' ?
                                                    <CaretRightFilled className='required-arrow' style={{ color: '#FF9900' }} /> : null
                                                }
                                                {list.label}
                                            </span>
                                        }
                                        name={isEmpty(value) || isChangedClicked ? list.name : undefined}
                                        rules={[{ validator: (rule, value) => validateInputField(rule, value, list.name) }]}
                                        className='margin-zero'
                                    >
                                        {isAddClicked || isChangedClicked ?
                                            <Input
                                                className='custom-input kyc-input-field'
                                                style={{ textTransform: 'uppercase' }}
                                                contentEditable
                                                onChange={(event: any) => {
                                                    setDisableSave(false);
                                                    if (list.name === 'account_number') {
                                                        setShowConfirmAccountNumber(true);
                                                        setAccountNumber(event?.target.value);
                                                    }
                                                }}
                                            /> : <Text>: {toUpper(value)}</Text>
                                        }
                                    </Form.Item>
                                    {list.name === 'account_number' && showConfirmAccountNumber &&
                                        <Form.Item
                                            labelCol={{ span: 13 }}
                                            label={
                                                <span className='kyc-form-label'>
                                                    {kycFlag === 'incomplete' && userType === UserTypes.SELLER ?
                                                        <CaretRightFilled className='required-arrow' style={{ color: '#FF9900' }} /> : null
                                                    }
                                                    Confirm Account Number :
                                                </span>
                                            }
                                            name=''
                                            rules={[{ validator: (rule, value) => confirmAccountValidator(rule, value, accountNumber) }]}
                                            className='margin-zero'
                                        >
                                            <Input
                                                className='custom-input kyc-input-field'
                                                style={{ textTransform: 'uppercase' }}
                                                contentEditable
                                                onChange={setDisableSave(false)}
                                            />
                                        </Form.Item>
                                    }
                                </React.Fragment> :
                                <Form.Item
                                    labelCol={{ span: 13 }}
                                    label={
                                        <span className='kyc-form-label' style={{ paddingBottom: '2.5em' }}>
                                            {isEmpty(value) && userType === UserTypes.SELLER ?
                                                <CaretRightFilled className='required-arrow' style={{ color: '#FF9900' }} /> : null
                                            }
                                            {list.label}<br />
                                            <Text className='font-size-small'>Front page of Bank Passbook/</Text><br />
                                            <Text className='font-size-small'>Cancelled Cheque</Text>
                                        </span>
                                    }
                                    name={isEmpty(value) || isChangedClicked ? list.name : undefined}
                                    className={isEmpty(value) ? `margin-zero` : ``}
                                >
                                    {!isEmpty(bank_doc) && !changeDocument &&
                                        <React.Fragment> :
                                            <Button
                                                type='link'
                                                onClick={() => {
                                                    dispatch(getUserFiles(bank_doc.doc_key, setImageSrc, setPDF))
                                                    setShowDocument(true);
                                                }}
                                            >
                                                View Document&nbsp;
                                            </Button>
                                            
                                            <Button type='link' onClick={() => setChangeDocument(true)}>
                                                &nbsp; Change Document
                                            </Button>
                                        </React.Fragment>
                                    }
                                    {displayWhenEmpty || displayWhenChange ?
                                        <React.Fragment>
                                            <UploadDocument
                                                className='margin-zero'
                                                name='bank_doc'
                                            />
                                            {changeDocument &&
                                                <Button onClick={() => setChangeDocument(!changeDocument)
                                            } type='link' danger>
                                                    Cancel
                                                </Button>
                                            }
                                        </React.Fragment> : null
                                    }
                                </Form.Item>
                            }
                        </Form.Item>
                    </div>
                );
            })}
            {showDocument && <ViewDocument url={imageSrc} isPDF={isPDF} setShowDocument={setShowDocument} />}
        </React.Fragment>
    );
};

export default BankDocuments;
