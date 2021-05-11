import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography, Upload } from 'antd';
import { CaretRightFilled, UploadOutlined } from '@ant-design/icons';
import { isEmpty, toUpper } from 'lodash';

import { bankDocumentsList, bankFieldValue, fieldLayout } from './constants';
import {
    confirmAccountValidator,
    customUpiValidator,
    normFile,
    validateInputField,
    validateUpload,
    ViewDocument
} from './utils';

import { UserTypes } from '../store/genericTypes';
import DefaultBtn from '../app-components/defaultBtn';
import { getUserFiles } from '../store/loginReducer/actions';

const { Text } = Typography;

const BankDocuments = (props: any) => {
    const { bank_doc, bankInfo, isAddClicked, isChangedClicked, kycFlag, setDisableSave, userType } = props;
    const dispatch = useDispatch();
    const [showDocument, setShowDocument] = useState(false);
    const [changeDocument, setChangeDocument] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [isPDF, setPDF] = useState(false);
    const [showConfirmAccountNumber,setShowConfirmAccountNumber] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");

    return (
        <>
            {
                bankDocumentsList.map((list) => {
                    const value = bankFieldValue(list.name, bankInfo) || "";
                    const displayWhenEmpty = (isEmpty(bank_doc) && (isAddClicked || isChangedClicked));
                    const displayWhenChange = !isEmpty(bank_doc) && changeDocument;

                    return (
                        <div
                            className={
                                kycFlag === "incomplete" &&
                                userType === UserTypes.SELLER &&
                                list.name !== "upi_id" ? `kyc-required` : ``
                            }
                        >
                            <Form.Item className="margin-zero">
                            { !list.upload ?
                                <>
                                    <Form.Item
                                        labelCol={{span: 13}}
                                        label={
                                            <span className="kyc-form-label">
                                                { kycFlag === "incomplete" && userType === UserTypes.SELLER && list.name !== "upi_id" ?
                                                    <CaretRightFilled className="required-arrow" style={{ color: "#FF9900"}} />: null
                                                }
                                                {list.label}
                                            </span>
                                        }
                                        name={isEmpty(value) || isChangedClicked ? list.name : undefined}
                                        rules={[{validator: (rule, value) => validateInputField(rule, value, list.name)}]}
                                        className="margin-zero"
                                    >
                                        {
                                            isAddClicked || isChangedClicked ?
                                                <Input
                                                    className="custom-input kyc-input-field"
                                                    style={{textTransform: "uppercase"}}
                                                    contentEditable
                                                    onChange={(event: any) => {
                                                        setDisableSave(false);
                                                        if(list.name === "account_number"){
                                                            setShowConfirmAccountNumber(true);
                                                            setAccountNumber(event?.target.value);
                                                        }
                                                    }}
                                                />: <Text>: {toUpper(value)}</Text>
                                        }
                                    </Form.Item>
                                    { list.name === "account_number" && showConfirmAccountNumber &&
                                        <Form.Item
                                            labelCol={{span: 13}}
                                            label={
                                                <span className="kyc-form-label">
                                                    { kycFlag === "incomplete" && userType === UserTypes.SELLER ?
                                                        <CaretRightFilled className="required-arrow" style={{ color: "#FF9900"}} />: null
                                                    }
                                                    Confirm Account Number
                                                </span>
                                            }
                                            name=""
                                            rules={[{validator: (rule, value) => confirmAccountValidator(rule, value, accountNumber)}]}
                                            className="margin-zero"
                                        >
                                            <Input
                                                className="custom-input kyc-input-field"
                                                style={{textTransform: "uppercase"}}
                                                contentEditable
                                                onChange={setDisableSave(false)}
                                            />
                                        </Form.Item>
                                    }
                                </> :
                                <Form.Item
                                    labelCol={{span: 13}}
                                    label={
                                        <span className="kyc-form-label" style={{paddingBottom: "2.5em"}}>
                                            { kycFlag === "incomplete" && userType === UserTypes.SELLER ?
                                                <CaretRightFilled className="required-arrow" style={{ color: "#FF9900"}} />: null
                                            }
                                            {list.label}<br/>
                                            <Text className="font-size-small">Canceled Cheque/</Text><br/>
                                            <Text className="font-size-small">Front page of Bank Passbook</Text>
                                        </span>
                                    }
                                    name={isEmpty(value) || isChangedClicked ? list.name : undefined}
                                    className={isEmpty(value) ? `margin-zero` : ``}
                                >
                                    { !isEmpty(bank_doc) && !changeDocument &&
                                        <>: 
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    dispatch(getUserFiles(bank_doc.doc_key, setImageSrc, setPDF))
                                                    setShowDocument(true);
                                                }}
                                            >
                                                View Document&nbsp;
                                            </Button>
                                            <Button type="link" onClick={() => setChangeDocument(true)}>
                                                &nbsp; Change Document
                                            </Button>
                                        </>
                                    }
                                    { displayWhenEmpty || displayWhenChange ?
                                        <>
                                            <Form.Item
                                                className="margin-zero"
                                                name="bank_doc"
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                                rules={[{ validator: (rule, value) => validateUpload(rule, value)}]}
                                            >
                                                <Upload
                                                    accept="image/*"
                                                    className="kyc-input-field"
                                                    beforeUpload={(file) => {
                                                        return false;
                                                    }}
                                                    name="bank_doc"
                                                    listType="text"
                                                    maxCount={1}
                                                    onChange={() => setDisableSave(false)}
                                                >
                                                    <DefaultBtn
                                                        icon={<UploadOutlined />}
                                                        content="Upload Document"
                                                    />
                                                    <br/><Text className="font-size-small">Max file size: 1MB</Text>
                                                </Upload>
                                            </Form.Item>
                                            { changeDocument &&
                                                <Button onClick={() => setChangeDocument(!changeDocument)} type='link' danger>
                                                    Cancel
                                                </Button>
                                            }
                                        </> : null
                                    }
                                </Form.Item>
                            }
                            </Form.Item>
                        </div>
                    );
                })
            }
            { showDocument && <ViewDocument url={imageSrc} isPDF={isPDF} setShowDocument={setShowDocument} /> }
        </>
    );
};

export default BankDocuments;
