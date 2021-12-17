import React from 'react';
import { Form, Input } from 'antd';
import { filter } from 'lodash';

import { validateInputField } from './utils';

import { UserTypes } from '../../store/genericTypes';
import { documentLabelMapping } from '../constants';
import UploadDocument from '../../app-components/uploadDocument';

type documentFormPropsModel = {
    userType: string;
    documents_list: Array<string>;
    subType: string;
};

const SellerDocuments = (props: { documents_list: Array<any>, subType: string, userType: string }) => {
    const { documents_list, subType, userType } = props;
    const xyz = filter(documents_list, { type: userType, sub_type: subType });
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list]
    });
    /* Creating a unique set */
    allDocumentsList = Array.from(new Set(allDocumentsList));

    return (
        <>
            {allDocumentsList.map((documentName) => {
                return (
                    <>
                        {documentLabelMapping.map((document) => {
                            const { formClassName, key, label, labelClassName, name, upload, uploadFormName } = document;
                            return (
                                (key === documentName) ?
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 18 }}
                                        label={<span className={labelClassName}>{label}</span>}
                                    >
                                        <Form.Item
                                            name={name}
                                            className={formClassName}
                                            rules={[{ validator: (rule, value) => validateInputField(rule, value, documentName) }]}
                                        >
                                            <Input className='custom-input' style={{ textTransform: 'uppercase' }} />
                                        </Form.Item>
                                        {upload ?
                                            <UploadDocument
                                                name={uploadFormName}
                                                style={{ display: 'inline-block', width: '20%', margin: '0 1em' }}
                                            /> : null
                                        }
                                    </Form.Item> : null
                            );
                        })}
                    </>
                );
            })}
        </>
    );
};

const BuyerDocuments = (props: { documents_list: Array<any>, subType: string, userType: string }) => {
    const { documents_list, subType, userType } = props;
    const xyz = filter(documents_list, { type: userType, sub_type: subType });
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list]
    });
    /* Creating a unique set */
    allDocumentsList = Array.from(new Set(allDocumentsList));

    return (
        <>
            {allDocumentsList.map((documentName) => {
                return (
                    <>
                        {documentLabelMapping.map((document) => {
                            const { formClassName, key, label, labelClassName, name, upload, uploadFormName } = document;
                            return (
                                (key === documentName) ?
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 18 }}
                                        label={<span className={labelClassName}>{label}</span>}
                                    >
                                        <Form.Item
                                            name={name}
                                            className={formClassName}
                                            rules={[{ validator: (rule, value) => validateInputField(rule, value, documentName) }]}
                                        >
                                            <Input className='custom-input' style={{ textTransform: 'uppercase' }} />
                                        </Form.Item>
                                        {upload ?
                                            <UploadDocument
                                                name={uploadFormName}
                                                style={{ display: 'inline-block', width: '20%', margin: '0 1em' }}
                                            /> : null
                                        }
                                    </Form.Item>
                                    : null
                            );
                        })}
                    </>
                );
            })}
        </>
    );
};

const DocumentsUploadComponents = (documentFormProps: documentFormPropsModel) => {
    const { userType, documents_list, subType } = documentFormProps;
    return (userType === UserTypes.BUYER
        ? <BuyerDocuments subType={subType} userType={userType} documents_list={documents_list} />
        : <SellerDocuments subType={subType} userType={userType} documents_list={documents_list} />);
};

export default DocumentsUploadComponents;
