import React, { useState } from 'react';
import { Button, Form, Select, Typography } from 'antd';
import { startCase } from 'lodash';

import { fieldLayout, workingHours } from './constants';

const { Text } = Typography;
const { Option } = Select;

const getWorkingHoursOptions = () => {
    return (
        workingHours.map((curOption) => {
            const { name, label } = curOption;
            return (
                <Option value={name}>{label}</Option>
            );
        })
    );
};

const BuyerWorkingHours = (props: { workingHours: any, setDisableSave: Function }) => {
    const { workingHours, setDisableSave } = props;
    const [change, setChange] = useState(false);

    return (
        <Form.Item
            {...fieldLayout}
            className='kyc-form-label'
            label='Working Hours'
        >
            {change ?
                <React.Fragment>
                    <Form.Item
                        label='Monday to Friday'
                        name='weekday'
                    >
                        <Select
                            className='custom-select'
                            defaultValue={workingHours?.weekday}
                            onChange={() => setDisableSave(false)}
                        >
                            {getWorkingHoursOptions()}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Saturday'
                        name='saturday'
                    >
                        <Select
                            className='custom-select'
                            defaultValue={workingHours?.saturday}
                            onChange={() => setDisableSave(false)}
                        >
                            {getWorkingHoursOptions()}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Sunday'
                        name='sunday'
                    >
                        <Select
                            className='custom-select'
                            defaultValue={workingHours?.sunday}
                            onChange={() => setDisableSave(false)}
                        >
                            {getWorkingHoursOptions()}
                        </Select>
                    </Form.Item>
                    <Button type='link' danger onClick={() => setChange(!change)}>Cancel</Button>
                </React.Fragment> :
                <React.Fragment>
                    <Text>Monday to Friday: {startCase(workingHours?.weekday.replaceAll('_', ' '))}</Text>
                    <br /><Text>Saturday: {startCase(workingHours?.saturday.replaceAll('_', ' '))}</Text>
                    <br /><Text>Sunday: {startCase(workingHours?.sunday.replaceAll('_', ' '))}</Text>
                    <br /><Button type='link' onClick={() => setChange(!change)}>Change</Button>
                </React.Fragment>
            }
        </Form.Item>
    );
};

export default BuyerWorkingHours;
