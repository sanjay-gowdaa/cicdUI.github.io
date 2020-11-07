import React, {useState} from 'react';
import { Modal, Typography, Button, 
    Row, Col, Form, Input, Select, Space, Divider } from 'antd';

const { Text } = Typography;
const { Option } = Select;
const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 20 },
};

const fieldwithInfoLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};
  
const AddCropModal = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        // dispatch(updateForm(values));
        // history.push(home)
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    const onReset = () => {
        form.resetFields();
        setModalVisible(false)
    }

    return (
      <>
        <Button type="primary" className='add-crop-btn vikas-btn-radius' onClick={() => setModalVisible(true)}>
            Add Crop
        </Button>
        <Modal
            title="Add Crop"
            visible={modalVisible}
            footer={[]}
            maskClosable={false}
            onCancel={() => setModalVisible(false)}
            width={'90%'}
            wrapClassName='add-crop-modal'
        >

            <Form
                form={form}
                className='add-crop-form'
                {...singleLabelFieldLayout}
                name="basic"
                initialValues={{intentToSell: 'Yes'}}
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
                        <Select
                            placeholder="Select"
                            allowClear
                            >
                            <Option value="rice">Rice</Option>
                            <Option value="ragi">Ragi</Option>
                        </Select>
                        <Space direction='horizontal'>
                            <Text type="secondary">Unable to find your crop?</Text>
                            <Text type="secondary" underline>Add Crop</Text>
                        </Space>
                    </Form.Item>
                    
                    <Form.Item
                        label="Select Sub Category"
                        name="subCategory"
                    >
                        <Select
                            placeholder="Select"
                            allowClear
                            >
                            <Option value="pearl_millet">Pearl Millet</Option>
                            <Option value="sona_masoori_raw">Sona Masoori Raw</Option>
                        </Select>
                        <Space direction='horizontal'>
                            <Text type="secondary">Unable to find your sub category?</Text>
                            <Text type="secondary" underline>Add Sub Category</Text>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Crop Grade"
                        name="grade"
                    >
                        <Select
                            placeholder="Select"
                            allowClear
                            >
                            <Option value="Grade_A">Grade A</Option>
                            <Option value="Grade_B">Grade B</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        {...fieldwithInfoLayout}
                        label="Qunatity"
                        name="qunatity"
                        rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                    >
                        <div className='display-flex-row'>
                            <Input placeholder="In quintal" />
                            <span className='additional-text'>Qtl</span>
                        </div>
                    </Form.Item>

                    <Form.Item
                        {...fieldwithInfoLayout}
                        label="Price per quintal"
                        name="pricePerQnt"
                        rules={[{ required: true, message: 'Please input the Price per quintal!' }]}
                    >
                        <div className='display-flex-row'>
                            <Input placeholder="In rupees" />
                            <span className='additional-text'>APMC Rate Mandya:</span>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Select Terms and Conditions"
                        name="termsAndConditions"
                    >
                        <Select placeholder="Select"></Select>
                    </Form.Item>

                    <Form.Item
                        label="Intent to sell"
                        name="intentToSell"
                        rules={[{ required: true, message: 'Please set your intent to sell' }]}
                    >
                        <Select placeholder="Select">
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col lg={2}>
                        <Divider className='height-full' type="vertical" />
                    </Col>
                    <Col sm={24} md={10} lg={10}>
                        <div>col-6</div>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <Button className='margin-l-r-1em crop-modal-action-btn vikas-btn-radius' type="text" htmlType="button" onClick={onReset}>
                            Cancel
                        </Button>
                        <Button className='crop-modal-action-btn vikas-btn-radius' type="primary" htmlType="submit">
                            Add Crop
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
      </>
    );
}

export default AddCropModal;