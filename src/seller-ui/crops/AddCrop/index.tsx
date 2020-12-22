import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Typography,
    Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { addCrop, addNewCrop, fetchAllCategories, fetchAllSubCategories } from '../../../store/sellerReducer/actions';
import { RootState } from '../../../store/rootReducer';
import { SellerStateModel } from '../../../store/sellerReducer/types';
import { renderCategoryOptions, renderGradeOptionsForSubCategory, renderSubCategoryOptions } from '../cropUtils';
import { UserStateModel } from '../../../store/loginReducer/types';
import PrimaryBtn from '../../../app-components/primaryBtn';
import CancelBtn from '../../../app-components/cancelBtn';


const { Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 20 },
};

const fieldwithInfoLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const AddCropModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [form] = Form.useForm(); 
    const dispatch = useDispatch();
    const sellerStore: SellerStateModel = useSelector((state: RootState) => state.seller);
    const userStore: UserStateModel = useSelector((state: RootState) => state.loginUser);

    useEffect(() => {
        sellerStore.categories && !sellerStore.categories.length && dispatch(fetchAllCategories())
    }, [])

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(addNewCrop(values));
        // dispatch(addCrop(values, userStore.id))
        form.resetFields();
        setModalVisible(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const onSelectCrop = (value: string) => {
        dispatch(fetchAllSubCategories(value));
    }

    const onSelectSubCategory = (value: string) => {
        setSelectedSubCategory(value)
    }

    return (
        <>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
                content="Add Crop"
            />
            <Modal
                title="Add Crop"
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                onCancel={() => {
                    form.resetFields();
                    setModalVisible(false)
                }}
                width={'90%'}
                wrapClassName="add-crop-modal"
            >
                <Form
                    form={form}
                    className="add-crop-form"
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={{ intentToSell: 'Yes' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={10} lg={10}>
                            <Form.Item
                                label="Select Crop"
                                name="cropName"
                                rules={[{ required: true, message: 'Please select the Crop!' }]}
                            >
                                <Select className="custom-select" placeholder="Select" onChange={onSelectCrop}>
                                    {renderCategoryOptions(sellerStore.categories)}
                                </Select>
                            </Form.Item>
                            {/* Addition crop name msg */}
                            <Space direction="horizontal">
                                <Text type="secondary">Unable to find your crop?</Text>
                                <Text type="secondary" underline>
                                    Add Crop
                                </Text>
                            </Space>
                            <Form.Item 
                                label="Select Sub Category" 
                                name="subCategory">
                                <Select className="custom-select" placeholder="Select" allowClear onChange={onSelectSubCategory} onClear={() => setSelectedSubCategory('')}>
                                    {renderSubCategoryOptions(sellerStore.subCategories)}
                                </Select>
                            </Form.Item>
                            {/* Addition Sub Category msg */}
                            <Space direction="horizontal">
                                <Text type="secondary">Unable to find your sub category?</Text>
                                <Text type="secondary" underline>
                                    Add Sub Category
                                </Text>
                            </Space>
                            <Form.Item label="Crop Grade" name="grade">
                                <Select className="custom-select" placeholder="Select" allowClear>
                                    {selectedSubCategory ? renderGradeOptionsForSubCategory(sellerStore.subCategories, selectedSubCategory) : []}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Qunatity"
                                name="qunatity"
                                rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                            >
                                <div className="display-flex-row">
                                    <Input className="custom-input" placeholder="In quintal" />
                                    <span className="additional-text">Qtl</span>
                                </div>
                            </Form.Item>

                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Price per quintal"
                                name="pricePerQnt"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Price per quintal!',
                                    },
                                ]}
                            >
                                <div className="display-flex-row">
                                    <Input className="custom-input" placeholder="In rupees" />
                                    <span className="additional-text">APMC Rate Mandya:</span>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Select Terms and Conditions"
                                name="termsAndConditions"
                            >
                                <Select className="custom-select" placeholder="Select" />
                            </Form.Item>

                            <Form.Item
                                label="Intent to sell"
                                name="intentToSell"
                                rules={[
                                    { required: true, message: 'Please set your intent to sell' },
                                ]}
                            >
                                <Select className="custom-select" placeholder="Select">
                                    <Option value="yes">Yes</Option>
                                    <Option value="no">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={2}>
                            <Divider className="height-full" type="vertical" />
                        </Col>
                        <Col sm={24} md={10} lg={10}>
                            <Form.Item label="Add Crop Photos" name="cropImages">
                                <Dragger
                                    className="crop-images-upload"
                                    multiple={true}
                                    accept="image/*"
                                    listType="picture-card"
                                    beforeUpload= {(file) => {
                                        return false
                                      }
                                    }
                                >
                                    <div className="display-flex-row">
                                        <div>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                        </div>
                                        <div>
                                            <p className="ant-upload-text">
                                                Drag and drop images here or Browse
                                            </p>
                                            <p className="ant-upload-hint">
                                                Upload maximum 5 images. Each image less than 1 MB
                                            </p>
                                        </div>
                                    </div>
                                </Dragger>
                            </Form.Item>
                            <Form.Item label="Additional Information" name="additionalInfo">
                                <TextArea className="custom-input" rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <CancelBtn
                                className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                                onClick={onReset}
                            />
                            <Button
                                className="crop-modal-action-btn vikas-btn-radius"
                                type="primary"
                                htmlType="submit"
                            >
                                Add Crop
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddCropModal;