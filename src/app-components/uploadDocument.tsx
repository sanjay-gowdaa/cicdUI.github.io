import React from 'react';
import { Form, Typography, Upload } from 'antd';
import { isEmpty } from 'lodash';
import { RuleObject } from 'rc-field-form/lib/interface';
import { UploadOutlined } from '@ant-design/icons';

import DefaultBtn from './defaultBtn';

const { Text } = Typography;

export const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const UploadDocument = (props: any) => {

    const validateUpload = (rule: RuleObject, value: any) => {
        if (!isEmpty(value)) {
            const size = value[0]?.size;
            if (size <= 1000000) {
                return Promise.resolve();
            } else {
                return Promise.reject('Max Size of file should be 1MB!');
            }
        } else {
            return Promise.resolve();
        }
    };

    return (
        <React.Fragment>
            <Form.Item
                {...props}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ validator: (rule, value) => validateUpload(rule, value) }]}
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
                    name="logo"
                    listType="text"
                    maxCount={1}
                >
                    <DefaultBtn
                    className="other-upload"
                        icon={<UploadOutlined />}
                        content="Upload Document"
                    />
                    <br /><Text className="font-size-small">Max file size: 1MB</Text>
                </Upload>
            </Form.Item>
        </React.Fragment>
    );
};

export default UploadDocument;
