import React from 'react'
import { Typography, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { matchesColumns } from './matchesTable.model'

const { Title } = Typography;

const MatchedSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    return (
        <div>
            <Title level={2}>My Matches</Title>
            <Table className='margin-t-1em' columns={matchesColumns} dataSource={sellerState.cropsList} />
        </div>
    )
}

export default MatchedSection;