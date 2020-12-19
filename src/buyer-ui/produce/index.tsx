import React from 'react';
import { Table, Typography } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { producColumns } from './produceTable.model';
import AddProduce from './AddProduce';

import './crops.scss';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const {masterProduceList} = buyerState;
    return (
        <div className="crops-container">
            <Title level={2}>My Produce</Title>
            <AddProduce masterProduceList={masterProduceList} />
            <Table
                className="margin-t-1em"
                columns={producColumns}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default CropsSection;
