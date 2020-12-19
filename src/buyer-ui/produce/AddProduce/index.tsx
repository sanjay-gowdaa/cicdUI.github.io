import React, { useState } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Typography,
    Upload,
} from 'antd';
import { useDispatch } from 'react-redux';

import { addNewProduce } from '../../../store/buyerReducer/actions';
import { flatMasterListType, MasterListProduce } from '../../../store/buyerReducer/types';
import CancelBtn from '../../../app-components/cancelBtn';
import PrimaryBtn from '../../../app-components/primaryBtn';

const { TextArea } = Input;
const { Option } = Select;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 20 },
};

const fieldwithInfoLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const getMasterProduceListOpts = ({masterProduceList}: {masterProduceList: Array<MasterListProduce>}) => {
    return (
        <>
            {
                masterProduceList.map((produce: MasterListProduce) => {
                    const {categoryId, categoryName, cropId, cropName, produceId, produceName, gradeId, gradeName} = produce;
                    return (
                        <Option 
                            key={`${categoryId}-${cropId}-${produceId}-${gradeId}`} 
                            value={`${produceName}-${cropName}-${categoryName}-${gradeName}`}
                        >
                            {`${produceName} - ${cropName} - ${categoryName} - ${gradeName}`}
                        </Option>
                    )
                })
            }
        </>
    );
};

const AddCropModal = ({masterProduceList}: {masterProduceList: Array<MasterListProduce>}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm(); 
    const dispatch = useDispatch();

    const onFinish = (fieldsValue: any) => {
        console.log('Success:', fieldsValue);
        dispatch(addNewProduce(fieldsValue));
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

    return (
        <>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
                content="Add Produce"
            />
            <Modal
                title="Add Interested Crops"
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                onCancel={() => setModalVisible(false)}
                width={'90%'}
                wrapClassName="add-crop-modal"
            >
                <Form
                    form={form}
                    className="add-crop-form"
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={{ }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={10} lg={10}>
                            <Form.Item
                                label="Select Produce (From Master List)"
                                name="produceName"
                                rules={[{ required: true, message: 'Please select the Produce!' }]}
                            >
                                <Select className="custom-select" placeholder="Select">
                                    {getMasterProduceListOpts({masterProduceList})}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Qunatity"
                                name="quantityReq"
                                rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                            >
                                <div className="display-flex-row">
                                    <Input className="custom-input" placeholder="In quintal" />
                                    <span className="additional-text">Qtl</span>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Delivery Required By"
                                name="deliveryBy"
                                rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
                            >
                                <DatePicker className="custom-input" />
                            </Form.Item>

                            <Form.Item
                                label="Select Terms and Conditions"
                                name="termsAndConditions"
                            >
                                <Select className="custom-select" placeholder="Select"></Select>
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
