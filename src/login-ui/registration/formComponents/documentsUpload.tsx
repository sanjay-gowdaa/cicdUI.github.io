import React from 'react';
import { Form, Radio, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {filter} from 'lodash';
import { UserTypes } from '../../../store/genericTypes';

type documentFormPropsModel = {
    userType: string;
    documents_list: Array<string>;
    subType: string;
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


const SellerDocuments = (props: {documents_list: Array<any>, subType: string}) => {
    const {documents_list, subType} = props;
    const xyz = filter(documents_list, {type : 'Seller', sub_type : subType})
    let allDocumentsList: Array<string> = [];
    xyz.forEach((entity) => {
        allDocumentsList = [...allDocumentsList, ...entity.documents_list]
    })
    /* Creating a unique set */
    allDocumentsList = Array.from(new Set(allDocumentsList));
    return (
    <>
        <Form.Item 
            labelCol={{span: 24}}
            wrapperCol={{span: 18}}
            label="Upload ID Card" 
        >
            <Form.Item
                name="id_type"
                rules={[{ required: true, message: 'Please select!' }]}
                style={{ display: 'inline-block', width: '60%' }}
            >
                <Radio.Group>
                    {
                        allDocumentsList.map((documentName) => {
                            return (
                                <Radio key={documentName.toLocaleLowerCase()} value={documentName.toLocaleLowerCase()}>{documentName}</Radio>
                            )
                        })
                    }
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="id_doc"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Upload ID!' }]}
                style={{ display: 'inline-block', width: '20%', margin: '0 1em' }}
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
                    name="pan"
                    listType="text"
                >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>
        </Form.Item>
    </>
    )
}

const BuyerDocuments = (props: {documents_list: Array<any>, subType: string}) => {
    return <p>Anirudh</p>
}

const DocumentsUploadComponents = (documentFormProps: documentFormPropsModel) => {
    const {userType, documents_list, subType} = documentFormProps
    return (userType === UserTypes.BUYER 
        ? <BuyerDocuments subType={subType} documents_list={documents_list} /> 
        : <SellerDocuments subType={subType} documents_list={documents_list} /> )
}

export default DocumentsUploadComponents;