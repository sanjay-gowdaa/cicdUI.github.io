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
    Space,
    Typography,
    Upload,
    InputNumber
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewCropData,
    fetchAllCategories,
    fetchAllMasterCrops,
    fetchAllVariety,
    updatedFetchLiveApmcRate
} from '../../../store/sellerReducer/actions';
import { RootState } from '../../../store/rootReducer';
import { SellerStateModel } from '../../../store/sellerReducer/types';
import {
    createSellerFormData,
    renderCategoryOptions,
    renderGradeOptionsForSubCategory,
    renderSubCategoryOptions
} from '../cropUtils';
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
}

const AddCropModal = (addCropProps: PropsType) => {
    const {setModalVisible, modalVisible} = addCropProps;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const sellerStore: SellerStateModel = useSelector((state: RootState) => state.seller);
    const loginUser: UserStateModel = useSelector((state: RootState) => state.loginUser);

    const [selectedMasterCrop, setSelectedMasterCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [showAlert, setAlert] = useState(false);
    const [formInitialize, setFormInitValues] = useState({
        intentToSell: 'No',
        additionalInfo: '',
        categoryName: null,
        cropName: null,
        subCategory: null,
        grade: null
    });

    useEffect(() => {
        sellerStore.categories && !sellerStore.categories.length && dispatch(fetchAllCategories());
    }, []);

    useEffect(() => {
        if(modalVisible) {
            const formInitValues = {
                intentToSell: 'No',
                additionalInfo: '',
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
        const updatedValueWithApmcRates = {
            ...values,
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
    };

    const onSelectVariety = (variety: string) => {
        /* Reset other fields */
        form.setFieldsValue({grade: null});
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
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                            >
                                <Form.Item name="quantity">
                                    <InputNumber
                                        style={{ width: 200 }}
                                        className="custom-input"
                                        placeholder="In quintal"
                                        stringMode
                                    />
                                </Form.Item>
                                <span className="additional-text">Qtl</span>
                            </Form.Item>
                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Price per quintal"
                                name="pricePerQnt"
                                rules={[{
                                    required: true,
                                    message: 'Please input the Price per quintal!',
                                }]}
                            >
                                <Form.Item name="pricePerQnt">
                                    <InputNumber
                                        className="custom-input"
                                        placeholder="In rupees"
                                        stringMode
                                    />
                                </Form.Item>
                                <span className="additional-text">APMC Rate {loginUser.district}: {sellerStore.apmcCropPrice}</span>
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
                                <Alert type="warning" message={<>You can not edit if intent to sell is set to "<b>Yes</b>"</>}/>}
                        </Col>
                        <Divider className="height-full" type="vertical" style={{height: "25em", color: "black" }} />
                        <Col span={12}>
                            <Form.Item label="Add Produce Photos" name="cropImages" required={showAlert}>
                                <Dragger
                                    className="crop-images-upload"
                                    multiple={true}
                                    accept="image/*"
                                    listType="picture-card"
                                    beforeUpload= {(file) => {
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
                            <Form.Item label="Additional Information" name="additionalInfo">
                                <TextArea className="custom-input" rows={4} />
                            </Form.Item>
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
