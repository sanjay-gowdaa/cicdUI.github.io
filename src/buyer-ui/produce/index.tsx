import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { producColumns } from './produceTable.model';
import AddProduce from './AddProduce';

import './crops.scss';
import { getProduceList } from '../../store/buyerReducer/actions';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const dispatch = useDispatch();
    const {masterProduceList} = buyerState;
    
    useEffect(() => {
        dispatch(getProduceList())
    }, [])

    return (
        <div className="crops-container">
            <Title level={2}>My Produce</Title>
            {/* <AddProduce masterProduceList={masterProduceList} /> */}
            <Table
                className="margin-t-1em"
                columns={producColumns}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default CropsSection;
