import React from 'react';
import { Typography, Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { producColumns } from './produceTable.model';
import './crops.scss';
import AddProduce from './AddProduce';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const {masterProduceList} = buyerState
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
