import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Typography,
    Upload
} from 'antd';
import { BarChartOutlined, InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import {
    createSellerFormData,
    renderCategoryOptions,
    renderGradeOptionsForSubCategory,
    renderSubCategoryOptions,
    validateSellerPrice
} from '../cropUtils';

import {
    addNewCropData,
    fetchAllCategories,
    fetchAllMasterCrops,
    fetchAllVariety,
    updatedFetchLiveApmcRate
} from '../../../store/sellerReducer/actions';
import { RootState } from '../../../store/rootReducer';
import { SellerStateModel } from '../../../store/sellerReducer/types';
import CancelBtn from '../../../app-components/cancelBtn';
import { UserStateModel } from '../../../store/loginReducer/types';

const { Text, Title } = Typography;
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

type PropsType = {
    setModalVisible: any;
    modalVisible: boolean;
};

const AddCropModal = (addCropProps: PropsType) => {
    const { setModalVisible, modalVisible } = addCropProps;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const sellerStore: SellerStateModel = useSelector((state: RootState) => state.seller);
    const loginUser: UserStateModel = useSelector((state: RootState) => state.loginUser);

    const [selectedMasterCrop, setSelectedMasterCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [showAlert, setAlert] = useState(false);
    const [formInitialize, setFormInitValues] = useState({
        intentToSell: 'No',
        transportRequired: 'No',
        additionalInfo: null,
        categoryName: null,
        cropName: null,
        subCategory: null,
        grade: null
    });

    useEffect(() => {
        sellerStore.categories && !sellerStore.categories.length && dispatch(fetchAllCategories());
    }, []);

    useEffect(() => {
        if (modalVisible) {
            const formInitValues = {
                intentToSell: 'No',
                transportRequired: 'No',
                additionalInfo: null,
                categoryName: null,
                cropName: null,
                subCategory: null,
                grade: null
            }
            setFormInitValues(formInitValues);
            form.setFieldsValue(formInitValues)
        }
    }, [modalVisible]);

    const onFinish = (values: any) => {
        // console.log('Success:', values);
        const additionalInfo = {
            moisture: values.moisture,
            other_info: values.other_info,
            packing_size: values.packing_size,
            packing_type: values.packing_type,
            fungus: values.fungus
        };
        delete values.moisture;
        delete values.other_info;
        delete values.packing_size;
        delete values.packing_type;
        delete values.fungus;

        const updatedValueWithApmcRates = {
            ...values,
            additionalInfo,
            district: loginUser.district,
            zip: loginUser.zip
        }
        // console.log('updatedValueWithApmcRates', updatedValueWithApmcRates);
        // For testing uncomment below and comment above
        // const updatedValueWithApmcRates = {...values, district: 'Gadag'};
        createSellerFormData(updatedValueWithApmcRates).then((sellerFromData) => {
            dispatch(addNewCropData(sellerFromData));
            resetAllState()
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const resetAllState = () => {
        form.resetFields();
        setModalVisible(false);
        setAlert(false);
    }

    const onSelectCategory = (category: string) => {
        /* Reset other fields */
        form.setFieldsValue({ cropName: null, subCategory: null, grade: null });
        setSelectedMasterCrop('');
        setSelectedVariety('');
        /* Reset other fields end */
        dispatch(fetchAllMasterCrops(category));
    };

    const onMasterCrops = (produce: string) => {
        /* Reset other fields */
        form.setFieldsValue({ subCategory: null, grade: null });
        setSelectedVariety('');
        /* Reset other fields end */
        setSelectedMasterCrop(produce);
        dispatch(fetchAllVariety(produce));
    };

    const onSelectVariety = (variety: string) => {
        /* Reset other fields */
        form.setFieldsValue({ grade: null });
        /* Reset other fields end */
        setSelectedVariety(variety);
    };

    const changeIntentToSell = (event: any) => {
        (event.target.value === 'Yes' ? setAlert(true) : setAlert(false));
    };

    return (
        <>
            <Modal
                title={<Title level={5}>Add Produce</Title>}
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                onCancel={resetAllState}
                width={'90%'}
                wrapClassName="add-crop-modal"
            >
                <Form
                    form={form}
                    className="add-crop-form"
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={formInitialize}
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
                            <Form.Item
                                label="Select Variety"
                                name="subCategory"
                                rules={[{ required: true, message: 'Please select the Produce Variety!' }]}
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    onChange={onSelectVariety}
                                    onClear={() => null}
                                >
                                    {renderSubCategoryOptions(sellerStore.variety)}
                                </Select>
                            </Form.Item>
                            {/* Addition Sub Category msg */}
                            <Form.Item
                                label="Select Grade"
                                name="grade"
                                rules={[{ required: true, message: 'Please select the grade!' }]}
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    onChange={(value: string) => {
                                        dispatch(updatedFetchLiveApmcRate({
                                            category: form.getFieldValue('categoryName'),
                                            itemName: selectedMasterCrop,
                                            variety: selectedVariety,
                                            grade: value,
                                        }))
                                    }}
                                >
                                    {selectedVariety ? renderGradeOptionsForSubCategory(sellerStore.variety, selectedVariety) : []}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...fieldwithInfoLayout}
                                name="quantity"
                            >
                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                    rules={[{
                                        required: true,
                                        message: 'Please input the Quantity!'
                                    }]}
                                >
                                    <Input
                                        style={{ width: 200 }}
                                        className="custom-input"
                                        placeholder="In quintal"
                                        suffix="Qtl"
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                {...fieldwithInfoLayout}
                                name="pricePerQnt"
                            >
                                <Form.Item
                                    label="Price per quintal"
                                    name="pricePerQnt"
                                    rules={[{
                                        required: true,
                                        validator: (rule, value) => validateSellerPrice(rule, value, sellerStore.apmcCropPrice)
                                    }]}
                                >
                                    <Input
                                        style={{ width: 200 }}
                                        className="custom-input"
                                        placeholder="In rupees"
                                        prefix="₹"
                                    />
                                </Form.Item>
                                <span className="additional-text">
                                    APMC Rate {loginUser.district}:
                                    <span style={{ fontWeight: 700 }}>&nbsp;&nbsp;{sellerStore.apmcCropPrice}</span>
                                    {typeof (sellerStore.apmcCropPrice) === "number" &&
                                        <Button type="link">
                                            View Details <BarChartOutlined />
                                        </Button>
                                    }
                                </span>
                            </Form.Item>
                            <Form.Item
                                label="Intent to Sell?"
                                name="intentToSell"
                                rules={[{
                                    required: true,
                                    message: 'Please set your intent to sell'
                                }]}
                            >
                                <Radio.Group
                                    className="custom-radio"
                                    name="intentToSell"
                                    onChange={changeIntentToSell}
                                >
                                    <Radio value={"Yes"}>Yes</Radio>
                                    <Radio value={"No"}>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            {showAlert &&
                                <Alert type="warning" message={<>You can not edit if intent to sell is set to "<b>Yes</b>"</>} />
                            }
                        </Col>
                        <Divider className="height-full" type="vertical" style={{ height: "45rem", color: "black" }} />
                        <Col span={12}>
                            <Form.Item
                                label="Transportation Required?"
                                name="transportRequired"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group
                                    className="custom-radio"
                                    name="transportRequired"
                                    onChange={() => console.log("changeTransportRequired")}
                                >
                                    <Radio value={"Yes"}>Yes</Radio>
                                    <Radio value={"No"}>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Add Produce Photos" name="cropImages" required={showAlert}>
                                <Dragger
                                    className="crop-images-upload"
                                    multiple={true}
                                    accept="image/*"
                                    listType="picture-card"
                                    beforeUpload={(file) => {
                                        return false
                                    }}
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
                            <div className="specifications">
                                <Form.Item label={<Text style={{ fontWeight: 700 }} >Seller Specifications</Text>}>
                                    <Form.Item
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 12 }}
                                        labelAlign="left"
                                        label="Moisture"
                                        name="moisture"
                                    >
                                        <Input
                                            className="custom-input"
                                            placeholder="Moisture in %"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 12 }}
                                        labelAlign="left"
                                        label="Fungus"
                                        name="fungus"
                                    >
                                        <Input
                                            className="custom-input"
                                            placeholder="Fungus in %"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 12 }}
                                        labelAlign="left"
                                        label="Packing Type"
                                        name="packing_type"
                                    >
                                        <Input
                                            className="custom-input"
                                            placeholder="Packing type"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 12 }}
                                        labelAlign="left"
                                        label="Packing Size"
                                        name="packing_size"
                                    >
                                        <Input
                                            className="custom-input"
                                            placeholder="Packing size in kg"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 12 }}
                                        labelAlign="left"
                                        label="Other Information"
                                        name="other_info"
                                    >
                                        <TextArea className="custom-input" rows={4} />
                                    </Form.Item>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <CancelBtn
                                className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                                onClick={resetAllState}
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
