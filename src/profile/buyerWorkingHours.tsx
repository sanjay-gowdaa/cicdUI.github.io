import React, { useState } from'react';
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

const BuyerWorkingHours = (props: any) => {
    const { workingHours, setDisableSave } = props;
    const { saturday, sunday, weekday } = workingHours;
    const [change, setChange] = useState(false);

    return (
        <Form.Item
            {...fieldLayout}
            className="kyc-form-label"
            label="Working Hours"
        >
            {
                change ?
                    <>
                        <Form.Item
                            label="Monday to Friday"
                            name="weekday"
                        >
                            <Select
                                className="custom-select"
                                defaultValue={weekday}
                                onChange={() => setDisableSave(false)}
                            >
                                { getWorkingHoursOptions() }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Saturday"
                            name="saturday"
                        >
                            <Select
                                className="custom-select"
                                defaultValue={saturday}
                            >
                                { getWorkingHoursOptions() }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Sunday"
                            name="sunday"
                        >
                            <Select
                                className="custom-select"
                                defaultValue={sunday}
                            >
                                { getWorkingHoursOptions() }
                            </Select>
                        </Form.Item>
                        <Button type="link" danger onClick={() => setChange(!change)}>Cancel</Button>
                    </> :
                    <>
                        <Text>Monday to Friday: {startCase(weekday.replaceAll("_", " "))}</Text>
                        <br/><Text>Saturday: {startCase(saturday.replaceAll("_", " "))}</Text>
                        <br/><Text>Sunday: {startCase(sunday.replaceAll("_", " "))}</Text>
                        <br/><Button type="link" onClick={() => setChange(!change)}>Change</Button>
                    </>
            }
        </Form.Item>
    );
};

export default BuyerWorkingHours;
