import React, { useState } from 'react';
import { Checkbox, Col, Form, Row, Select } from 'antd';

import { workingHours } from '../constants';

const { Option } = Select;

const WorkingHours = (props: { form: any }) => {
    const { form } = props;
    const [workHoursDisbaled, toggleWorkHoursDisbaled] =
        useState({ weekday: false, saturday: false, sunday: false } as any);

    const onChangeAllDay = (e: any, relatedEntity: string) => {
        const { checked } = e.target || {};
        if (checked) {
            form.setFieldsValue({ [relatedEntity]: 'all_day' });
        } else {
            form.setFieldsValue({ [relatedEntity]: '9am_to_5pm' });
        }
        const updatedWorkHoursStatus = { ...workHoursDisbaled, [relatedEntity]: !workHoursDisbaled[relatedEntity] };

        toggleWorkHoursDisbaled(updatedWorkHoursStatus);
    };

    const checkIfDisabled = (fieldName: string) => workHoursDisbaled[fieldName];

    const getWorkingHoursOptions = () => {
        return (
            workingHours.map((curOption) => {
                const { name, label, disabled } = curOption;
                return (
                    <Option disabled={disabled} value={name}>{label}</Option>
                );
            })
        );
    };

    return (
        <React.Fragment>
            <h2 className='required-form-field'>Working Hours</h2>
            <Row gutter={16} justify='start'>
                <Col sm={24} md={24} lg={12}>
                    <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        label='Monday to Friday'
                    >
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            name='weekday'
                            rules={[{ required: true }]}
                        >
                            <Select
                                className='custom-select'
                                disabled={checkIfDisabled('weekday')}
                                style={{ width: '50%' }}
                                placeholder='Please Select'
                            >
                                {getWorkingHoursOptions()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            valuePropName='checked'
                        >
                            <Checkbox
                                className='custom-checkbox'
                                onChange={(e) => onChangeAllDay(e, 'weekday')}
                                style={{ margin: '0 2em' }}
                            >
                                24 hours
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        label='Saturday'
                    >
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            name='saturday'
                            rules={[{ required: true }]}
                        >
                            <Select
                                className='custom-select'
                                disabled={checkIfDisabled('saturday')}
                                style={{ width: '50%' }}
                                placeholder='Please Select'
                            >
                                {getWorkingHoursOptions()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            valuePropName='checked'
                        >
                            <Checkbox
                                className='custom-checkbox'
                                onChange={(e) => onChangeAllDay(e, 'saturday')}
                                style={{ margin: '0 2em' }}
                            >
                                24 hours
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        label='Sunday'
                    >
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            name='sunday'
                            rules={[{ required: true }]}
                        >
                            <Select
                                disabled={checkIfDisabled('sunday')}
                                style={{ width: '50%' }}
                                placeholder='Please Select'
                            >
                                {getWorkingHoursOptions()}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 10 }}
                            noStyle
                            valuePropName='checked'
                        >
                            <Checkbox
                                className='custom-checkbox'
                                onChange={(e) => onChangeAllDay(e, 'sunday')}
                                style={{ margin: '0 2em' }}
                            >
                                24 hours
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default WorkingHours;
