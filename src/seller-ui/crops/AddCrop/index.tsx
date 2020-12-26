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
import { addNewCropData, fetchAllCategories, fetchAllMasterCrops, fetchAllVariety, fetchCropApmcPrice } from '../../../store/sellerReducer/actions';
import { RootState } from '../../../store/rootReducer';
import { SellerStateModel } from '../../../store/sellerReducer/types';
import {
    createSellerFormData,
    renderCategoryOptions,
    renderGradeOptionsForSubCategory,
    renderSubCategoryOptions
} from '../cropUtils';
import PrimaryBtn from '../../../app-components/primaryBtn';
import CancelBtn from '../../../app-components/cancelBtn';
import { UserStateModel } from '../../../store/loginReducer/types';

const { Text, Title } = Typography;
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
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const sellerStore: SellerStateModel = useSelector((state: RootState) => state.seller);
    const loginUser: UserStateModel = useSelector((state: RootState) => state.loginUser);

    const [selectedMasterCrop, setSelectedMasterCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');

    useEffect(() => {
        sellerStore.categories && !sellerStore.categories.length && dispatch(fetchAllCategories());
    }, [])

    const onFinish = (values: any) => {
        // console.log('Success:', values);
        const updatedValueWithApmcRates = {...values, apmcRate: !isNaN(parseFloat(sellerStore.apmcCropPrice)) ? parseFloat(sellerStore.apmcCropPrice) : null}
        // For testing uncomment below and comment above
        // const updatedValueWithApmcRates = {...values, apmcRate: parseFloat('1800')}
        dispatch(addNewCropData(createSellerFormData(updatedValueWithApmcRates)));
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

    const onSelectCategory = (category: string) => {
        /* Reset other fields */
        form.setFieldsValue({cropName: null, subCategory: null, grade: null});
        setSelectedMasterCrop('');
        setSelectedVariety('');
        /* Reset other fields end */
        dispatch(fetchAllMasterCrops(category));
    };

    const onMasterCrops = (produce: string) => {
        /* Reset other fields */
        form.setFieldsValue({subCategory: null, grade: null});
        setSelectedVariety('');
        /* Reset other fields end */
        setSelectedMasterCrop(produce);
        dispatch(fetchAllVariety(produce));
    }

    const onSelectVariety = (variety: string) => {
        /* Reset other fields */
        form.setFieldsValue({grade: null});
        /* Reset other fields end */
        setSelectedVariety(variety);
    }

    return (
        <>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
                content="Add Crop"
            />
            <Modal
                title={<Title level={5}>Add Produce</Title>}
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
                    initialValues={{
                        intentToSell: 'Yes',
                        categoryName: null,
                        cropName: null,
                        subCategory: null,
                        grade: null
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={10} lg={10}>
                            <Form.Item
                                label="Select Category"
                                name="categoryName"
                                rules={[{ required: true, message: 'Please select the Crop Category!' }]}
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    onChange={onSelectCategory}
                                >
                                    {renderCategoryOptions(sellerStore.categories)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Select Produce"
                                name="cropName"
                                rules={[{ required: true, message: 'Please select the Produce!' }]}
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    onChange={onMasterCrops}
                                >
                                    {renderCategoryOptions(sellerStore.masterCrops)}
                                </Select>
                            </Form.Item>
                            {/* Addition crop name msg */}
                            <Space direction="horizontal">
                                <Text type="secondary">Unable to find your produce?</Text>
                                <Text type="secondary" underline>
                                    Add Produce
                                </Text>
                            </Space>
                            <Form.Item 
                                label="Select Variety"
                                name="subCategory"
                                rules={[{ required: true, message: 'Please select the Produce Variety!' }]}
                            >
                                <Select 
                                    className="custom-select"
                                    placeholder="Select"
                                    allowClear
                                    onChange={(value: string) => {
                                            onSelectVariety(value)
                                            dispatch(fetchCropApmcPrice({commodity: selectedMasterCrop, variety: value}))
                                        }
                                    }
                                    onClear={() => null}
                                >
                                    {renderSubCategoryOptions(sellerStore.variety)}
                                </Select>
                            </Form.Item>
                            {/* Addition Sub Category msg */}
                            <Space direction="horizontal">
                                <Text type="secondary">Unable to find your sub variety?</Text>
                                <Text type="secondary" underline>
                                    Add Variety
                                </Text>
                            </Space>
                            <Form.Item
                                label="Select Grade"
                                name="grade"
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    allowClear
                                >
                                    {selectedVariety ? renderGradeOptionsForSubCategory(sellerStore.variety, selectedVariety) : []}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Qunatity"
                                name="quantity"
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
                                    <span className="additional-text">
                                        APMC Rate {(loginUser as any).district}: {sellerStore.apmcCropPrice}
                                    </span>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Select Terms and Conditions"
                                name="termsAndConditions"
                            >
                                <Select className="custom-select" placeholder="Select" />
                                <Text type="secondary" underline>
                                    Add Terms
                                </Text>
                            </Form.Item>

                            <Form.Item
                                label="Intent to Sell?"
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
                            <Form.Item label="Add Produce Photos" name="cropImages">
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
                                                Drag and drop images here or <a>Browse</a>
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
                                Add Produce
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddCropModal;