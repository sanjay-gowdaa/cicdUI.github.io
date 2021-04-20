import React from 'react';
import { Typography, Select } from 'antd';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash } from '../../app-components/utils';
const { Title } = Typography;
const { Option } = Select;

type RejectConfrimationProps = {
    matchRecord: MatchRequirementModel
}

const RejectConfrimation = (props: RejectConfrimationProps) => {
    const {matchRecord} = props;
    const {produce, buyer_id} = matchRecord;
    return (
        <>
            <Title level={5}>Buyer {parseIDfromHash(buyer_id)} : {produce}</Title>
            <p>Select your reason for rejection</p>
            <Select defaultValue="reasons">
                <Option value="reasons">Reasons</Option>
            </Select>
        </>
    )
}

export default RejectConfrimation;