import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography, Upload } from 'antd';
import { CaretRightFilled, UploadOutlined } from '@ant-design/icons';
import { filter, isEmpty, toUpper } from 'lodash';

import {
    documentLabelMapping,
    fieldLayout,
    inputFieldValue,
    uploadFiledValue
} from './constants';
import { normFile, validateInputField, validateUpload, ViewDocument } from './utils';

import { UserTypes } from '../store/genericTypes';
import DefaultBtn from '../app-components/defaultBtn';
import { getUserFiles } from '../store/loginReducer/actions';

const { Text } = Typography;

const DocumentsUploaded = (props: any)=> {
    const { config, kycFlag, setDisableSave, userDetails } = props;
    const userType = userDetails.is_buyer ? UserTypes.BUYER : UserTypes.SELLER;
    const subType = userType === UserTypes.BUYER ? userDetails.buyer_type : userDetails.seller_type;

    const [showDocument, setShowDocument] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [isPDF, setPDF] = useState(false);
    const dispatch = useDispatch();

    const xyz =  isEmpty(userDetails.category) ?
        filter(config, {type: userType, sub_type: subType}) :
        filter(config, {type: userType, sub_type: subType, category: userDetails.category});
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list];
    });

    return (
        <>
            {
                allDocumentsList.map((documentName) => {
                    return (
                        <div className={kycFlag === "incomplete"  ? `kyc-required` : ``}>
                            {
                                documentLabelMapping.map((document) => {
                                    const { key, label, name, upload, uploadFormName } = document;
                                    const value = inputFieldValue(name, userDetails);
                                    const uploadValue = upload ? uploadFiledValue(uploadFormName, userDetails) : null;
                                    
                                    return (
                                        (key === documentName)?
                                            <Form.Item
                                                label={
                                                    <span className="kyc-form-label">
                                                        {kycFlag === "incomplete" &&
                                                            <CaretRightFilled className="required-arrow" style={{ color: "#FF9900"}} />
                                                        }
                                                        {label}
                                                    </span>
                                                }
                                                {...fieldLayout}
                                                className="margin-zero"
                                                onReset={() => console.log("on reset")}   
                                            >
                                                { isEmpty(value) ?
                                                    <Form.Item
                                                        className="margin-zero"
                                                        name={isEmpty(value) ? name : undefined }
                                                        rules={[{validator: (rule, value) => validateInputField(rule, value, name)}]}
                                                    >
                                                        <Input
                                                            className="custom-input kyc-input-field"
                                                            style={{textTransform: "uppercase"}}
                                                            defaultValue={value}
                                                            contentEditable
                                                            onChange={() => setDisableSave(false)}
                                                        />
                                                    </Form.Item> : <Text>: {toUpper(value)}</Text>
                                                }
                                                {
                                                    upload &&
                                                        <>
                                                            { isEmpty(uploadValue) ?
                                                                <Form.Item
                                                                    className="margin-zero"
                                                                    name={isEmpty(uploadValue) ? uploadFormName: undefined}
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
                                                                        name={isEmpty(uploadValue) ? uploadFormName: undefined}
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
                                                                </Form.Item> :
                                                                <Button
                                                                    type="link"
                                                                    onClick={() => {
                                                                        dispatch(getUserFiles(uploadValue.doc_key, setImageSrc, setPDF))
                                                                        setShowDocument(true);
                                                                    }}
                                                                >&nbsp; &nbsp;View Document</Button>
                                                            }
                                                        </>
                                                }
                                            </Form.Item> : null
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
            { showDocument && <ViewDocument url={imageSrc} setShowDocument={setShowDocument} isPDF={isPDF} /> }
        </>
    );
};

export default DocumentsUploaded;
