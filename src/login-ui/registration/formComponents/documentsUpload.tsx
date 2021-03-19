import React from 'react';
import { Form, Input, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {filter, toLower} from 'lodash';

import { validateInputField, validateUpload } from '../utils';

import { UserTypes } from '../../../store/genericTypes';
import DefaultBtn from '../../../app-components/defaultBtn';
import { documentLabelMapping } from '../../constants';

const { Text } = Typography;

type documentFormPropsModel = {
    userType: string;
    documents_list: Array<string>;
    subType: string;
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const SellerDocuments = (props: {documents_list: Array<any>, subType: string, userType: string}) => {
    const {documents_list, subType, userType} = props;
    const xyz = filter(documents_list, {type : userType, sub_type : subType});
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list]
    });
    /* Creating a unique set */
    allDocumentsList = Array.from(new Set(allDocumentsList));

    return (
        <>
            {
                allDocumentsList.map((documentName) => {
                    return (
                        <>
                            {
                                documentLabelMapping.map((document) => {
                                    const { formClassName, key, label, labelClassName, name, upload, uploadFormName } = document;
                                    return ( 
                                        (key === documentName)?
                                        <Form.Item
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 18 }}
                                            label={<span className={labelClassName}>{label}</span>}
                                        >
                                            <Form.Item
                                                name={name}
                                                className={formClassName}
                                                rules={[{ validator: (rule, value) => validateInputField(rule, value, documentName)}]}
                                            >
                                                <Input className="custom-input" style={{textTransform: "uppercase"}} />
                                            </Form.Item>
                                            {
                                                upload ?
                                                    <Form.Item
                                                        name={uploadFormName}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        rules={[{ validator: (rule, value) => validateUpload(rule, value)}]}
                                                        style={{ display: "inline-block", width: "20%", margin: "0 1em"}}
                                                    >
                                                        <Upload
                                                            accept="image/*"
                                                            beforeUpload={(file) => {
                                                                // const isRequiredFileType =
                                                                //     file.type === 'image/jpeg' ||
                                                                //     file.type === 'image/png';
                                                                // if (!isRequiredFileType) {
                                                                //     message.error(
                                                                //         `${file.name} is not an Image file`,
                                                                //     );
                                                                // }
                                                                // return isRequiredFileType;
                                                                return false;
                                                            }}
                                                            name={toLower(documentName)}
                                                            listType="text"
                                                        >
                                                            <DefaultBtn
                                                                icon={<UploadOutlined />}
                                                                content="Upload Document"
                                                            />
                                                            <Text className="font-size-small">Max file size: 1MB</Text>
                                                        </Upload>
                                                    </Form.Item> : null
                                            }
                                        </Form.Item> : null
                                    );
                                })
                            }
                        </>
                    );
                })
            }
        </>
    );
};

const BuyerDocuments = (props: {documents_list: Array<any>, subType: string, userType: string}) => {
    const {documents_list, subType, userType} = props;
    const xyz = filter(documents_list, {type : userType, sub_type : subType});
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list]
    });
    /* Creating a unique set */
    allDocumentsList = Array.from(new Set(allDocumentsList));

    return (
        <>
            {
                allDocumentsList.map((documentName) => {
                    return (
                        <>
                            {
                                documentLabelMapping.map((document) => {
                                    const { formClassName, key, label, labelClassName, name, upload, uploadFormName } = document;
                                    return (
                                        (key === documentName)?
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 18 }}
                                                label={<span className={labelClassName}>{label}</span>}
                                            >
                                                <Form.Item
                                                    name={name}
                                                    className={formClassName}
                                                    rules={[{ validator: (rule, value) => validateInputField(rule, value, documentName)}]}
                                                >
                                                    <Input className="custom-input" style={{textTransform: "uppercase"}} />
                                                </Form.Item>
                                                {
                                                    upload ?
                                                    <Form.Item
                                                        name={uploadFormName}
                                                        valuePropName="fileList"
                                                        getValueFromEvent={normFile}
                                                        rules={[{ validator: (rule, value) => validateUpload(rule, value)}]}
                                                        style={{ display: "inline-block", width: "20%", margin: "0 1em"}}
                                                    >
                                                        <Upload
                                                            accept="image/*"
                                                            beforeUpload={(file) => {
                                                                // const isRequiredFileType =
                                                                //     file.type === 'image/jpeg' ||
                                                                //     file.type === 'image/png';
                                                                // if (!isRequiredFileType) {
                                                                //     message.error(
                                                                //         `${file.name} is not an Image file`,
                                                                //     );
                                                                // }
                                                                // return isRequiredFileType;
                                                                return false;
                                                            }}
                                                            name={toLower(documentName)}
                                                            listType="text"
                                                        >
                                                            <DefaultBtn
                                                                icon={<UploadOutlined />}
                                                                content="Upload Document"
                                                            />
                                                            <Text className="font-size-small">Max file size: 1MB</Text>
                                                        </Upload>
                                                    </Form.Item> : null
                                                }
                                            </Form.Item>     
                                        : null
                                    );
                                })
                            }
                        </>
                    );
                })
            }
        </>
    );
};

const DocumentsUploadComponents = (documentFormProps: documentFormPropsModel) => {
    const {userType, documents_list, subType} = documentFormProps;
    return (userType === UserTypes.BUYER 
        ? <BuyerDocuments subType={subType} userType={userType} documents_list={documents_list} /> 
        : <SellerDocuments subType={subType} userType={userType} documents_list={documents_list} /> );
};

export default DocumentsUploadComponents;
