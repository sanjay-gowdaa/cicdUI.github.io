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
    Upload
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewCropData,
    fetchAllCategories,
    fetchAllMasterCrops,
    fetchAllVariety,
    updateCropData,
    updatedFetchLiveApmcRate
} from '../../../store/sellerReducer/actions';
import { RootState } from '../../../store/rootReducer';
import { CropApiModel, SellerStateModel } from '../../../store/sellerReducer/types';
import {
    createSellerFormData,
    renderCategoryOptions,
    renderGradeOptionsForSubCategory,
    renderSubCategoryOptions
} from '../cropUtils';
import CancelBtn from '../../../app-components/cancelBtn';
import { UserStateModel } from '../../../store/loginReducer/types';
import { camelCase } from 'lodash';

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
    currentProduceRecord: CropApiModel;
    isEdit: boolean;
    setIsEdit: any;
    setModalVisible: any;
    modalVisible: boolean;
}

const AddCropModal = (addCropProps: PropsType) => {
    const {currentProduceRecord, isEdit, setIsEdit, setModalVisible, modalVisible} = addCropProps;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const sellerStore: SellerStateModel = useSelector((state: RootState) => state.seller);
    const loginUser: UserStateModel = useSelector((state: RootState) => state.loginUser);

    const [selectedMasterCrop, setSelectedMasterCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [intentToSell, setIntentToSell] = useState(false);
    const [formInitialize, setFormInitValues] = useState({
        intentToSell: 'No',
        additionalInfo: '',
        categoryName: null,
        cropName: null,
        subCategory: null,
        grade: null
    });
    const [customFileList, setCustomFileList] = useState([])

    useEffect(() => {
        sellerStore.categories && !sellerStore.categories.length && dispatch(fetchAllCategories());
    }, []);

    useEffect(() => {
        if(modalVisible) {
            const formInitValues = isEdit ? processEditValues(currentProduceRecord) : {
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
        createSellerFormData(updatedValueWithApmcRates, isEdit, customFileList).then((sellerFromData) => {
            if(isEdit) {
                const {sk, pk} = currentProduceRecord;
                dispatch(updateCropData({...sellerFromData, sk, pk, is_delete: "no"}));
            } else {
                dispatch(addNewCropData(sellerFromData));
            }
            resetAllState()
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const processEditValues = (currentProduceRecord: CropApiModel) => {
        let updatedProduceObject: any = {}
        let cropImagesData: any = [];
        const produceEntries = Object.entries(currentProduceRecord);
        console.log('produceEntries', produceEntries);
        produceEntries.forEach((currentEntry, curIndex) => {
            const produceDataKey = currentEntry[0];
            const camelCasedKey = camelCase(produceDataKey);
            
            /* First approach */
            // if (produceDataKey.includes('crop_image')) {
            //     if(currentEntry[1].length) {
            //         cropImagesData.push({
            //             uid: curIndex,
            //             name: produceDataKey,
            //             status: 'done',
            //             url: currentEntry[1]
            //         })
            //     }
            // } else {
            //     updatedProduceObject[camelCasedKey] = currentEntry[1];
            // }
            /* First approach end*/

            if(produceDataKey.includes('crop_image')) {
                updatedProduceObject[produceDataKey] = currentEntry[1];
                cropImagesData.push(currentEntry[1]);
            } else {
                updatedProduceObject[camelCasedKey] = currentEntry[1];
            }
        });
        /* First approach */
        // if(cropImagesData.length) {
        //     updatedProduceObject['cropImages'] = cropImagesData;
        //     setCustomFileList(cropImagesData);
        // }
        /* First approach end */
        setCustomFileList(cropImagesData);
        return updatedProduceObject;
    }

    const resetAllState = () => {
        form.resetFields();
        setModalVisible(false);
        setIsEdit(false);
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
                                    onChange={onSelectVariety}
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
                                rules={[{ required: true, message: 'Please select the grade!' }]}
                            >
                                <Select
                                    className="custom-select"
                                    placeholder="Select"
                                    allowClear
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
                            <Form.Item {...fieldwithInfoLayout} label="Qunatity">
                                <Form.Item
                                    name="quantity"
                                    noStyle
                                    rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                                >
                                    <Input style={{ width: 200 }} className="custom-input" placeholder="In quintal" />
                                </Form.Item>
                                <span className="additional-text">Qtl</span>
                            </Form.Item>
                            <Form.Item {...fieldwithInfoLayout} label="Price per quintal">
                                <Form.Item
                                    name="pricePerQnt"
                                    rules={[{
                                        required: true,
                                        message: 'Please input the Price per quintal!',
                                    }]}
                                    noStyle
                                >
                                    <Input className="custom-input" placeholder="In rupees" />
                                </Form.Item>
                                <span className="additional-text">
                                    APMC Rate {loginUser.district}: {sellerStore.apmcCropPrice}
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
                                <Radio.Group className="custom-radio" defaultValue={"No"}>
                                    <Radio value={"Yes"} onClick={() => setIntentToSell(true)}>Yes</Radio>
                                    <Radio value={"No"} onClick={() => setIntentToSell(false)}>No</Radio>
                                </Radio.Group><br/>
                                {intentToSell && <Alert type="warning" message={<>You can not edit if intent to sell is set to "<b>Yes</b>"</>}/>}
                            </Form.Item>
                        </Col>
                        <Divider className="height-full" type="vertical" style={{height: "25em", color: "black" }} />
                        <Col span={12}>
                            <Form.Item label="Add Produce Photos" name="cropImages" required={intentToSell}>
                                <Dragger
                                    className="crop-images-upload"
                                    multiple={true}
                                    accept="image/*"
                                    listType="picture-card"
                                    disabled={isEdit}
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
                                { isEdit ? 'Edit' : 'Add' } Produce
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddCropModal;
