import React, { useState } from 'react';
import {
    Modal,
    Typography,
    Button,
    Row,
    Col,
    Form,
    Input,
    Select,
    Upload,
    DatePicker
} from 'antd';
import { useDispatch } from 'react-redux';
import { addNewProduce } from '../../../store/buyerReducer/actions';

const { Option } = Select;
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
            <Button
                type="primary"
                className="add-crop-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
            >
                Add Produce
            </Button>
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
                                label="Select Produce (From Master List)*"
                                name="produceName"
                                rules={[{ required: true, message: 'Please select the Produce!' }]}
                            >
                                <Select placeholder="Select">
                                    <Option value="Cereal - Ragi - Pearl Millet - Grade A">Cereal - Ragi - Pearl Millet - Grade A</Option>
                                    <Option value="Cereal - Rice - Sona Masoori Raw - Grade B">Cereal - Rice - Sona Masoori Raw - Grade B</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Qunatity"
                                name="quantityReq"
                                rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                            >
                                <div className="display-flex-row">
                                    <Input placeholder="In quintal" />
                                    <span className="additional-text">Qtl</span>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Delivery Required By"
                                name="deliveryBy"
                                rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Select Terms and Conditions"
                                name="termsAndConditions"
                            >
                                <Select placeholder="Select"></Select>
                            </Form.Item>
                            <Form.Item label="Additional Information" name="additionalInfo">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Button
                                className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                                type="text"
                                htmlType="button"
                                onClick={onReset}
                            >
                                Cancel
                            </Button>
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
