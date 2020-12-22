import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Checkbox,
    Col,
    Input,
    List,
    Row,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import {uniqBy, remove} from 'lodash';
import { FilterOutlined, CaretRightOutlined } from '@ant-design/icons';

import {mockMasterFlatList} from '../../../store/mockMasterList';
import { masterListColumns } from './../masterListTable.model';
import { BuyerStateModel, CropCategoryModel, flatMasterListType, ProduceModel } from '../../../store/buyerReducer/types';
import { fetchAllProduce, fetchAllCrops, updateMasterlist, fetchAllVariety } from '../../../store/buyerReducer/actions';
import DefaultBtn from '../../../app-components/defaultBtn';
import CancelBtn from '../../../app-components/cancelBtn';

import '../../../app-components/customComponent.scss';
import { RootState } from '../../../store/rootReducer';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const MasterList = (props: any) => {
    const {setModalVisible} = props;
    const dispatch = useDispatch();
    // const [masterList, updateMasterList] = useState(mockMasterFlatList);
    // const [produceListForMasterCategory, setProduceListForMasterCategory] = useState([]);
    // const [selectedProduce, setSelectedProduce] = useState({produceId: '', produceName: ''});
    // const [selectedCropDetails, setSelectedCropDetails] = useState({cropId: '', cropName: ''});
    // const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({categoryId: '', categoryName: ''});
    const [addedMasterList, updateAddedMasterList] = useState([]);
    
    const [selectedProduceCategory, setSelectedProduceCategory] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const buyerStore: BuyerStateModel = useSelector((state: RootState) => state.buyer);

    useEffect(() => {
        buyerStore.produceList && !buyerStore.produceList.length && dispatch(fetchAllProduce());
    }, [])

    /* On change of master produce selection*/
    const handleMasterProduceChange = (produceName: string) => {
        // Should erase the variety and grade data on change.
        setSelectedProduceCategory(produceName);
        dispatch(fetchAllCrops(produceName));
    }

    const handleMasterVarietyChange = (cropName: string) => {
        setSelectedCrop(cropName);
        dispatch(fetchAllVariety(cropName));
    }

    /* Show options for master produce details */
    const renderMasterProduceChildren = (produce: Array<string>) => {
        const categoryOptions = produce.map((category) => 
            <Option key={category} value={category} >{category}</Option> )
        return categoryOptions;
    };

    /* Get/Show Crops for the selected master produce */
    const getProduceTypeData = (crop: Array<string>) => {
        const produceList = crop.map((cropType) => 
            <List.Item onClick={() => handleMasterVarietyChange(cropType)}>
                {cropType} <CaretRightOutlined/>
            </List.Item> )
        return produceList;
    }

    /* Show categories for the selected Crop */
    const getCategoryListData = (cropName: Array<CropCategoryModel>) => {
        const varietyList = uniqBy(cropName, 'variety').map((currentCropData) => {
            const {variety} = currentCropData;
            return (<>
                <List.Item onClick={() => setSelectedVariety(variety)}>
                    {variety} <CaretRightOutlined />
                </List.Item>
            </>)
        })
        return varietyList;
    };

    /* Show grades for the selected Category */
    const getGradeData = (cropName: Array<CropCategoryModel>, cropVariety: string ) => {
        const gradeList = cropName
            .filter((crop: CropCategoryModel) => crop.variety === cropVariety)
                .map(({grade}: CropCategoryModel, index) => {
                    return (
                        <>
                            <List.Item key={`${grade}-${index}`} >
                                <Checkbox className="custom-checkbox" 
                                    onChange={()=> {
                                        setSelectedGrade(grade);
                                        addCropToList()
                                    }}
                                >
                                    {grade}
                                </Checkbox>
                            </List.Item>
                        </>
                    )
                })
        return gradeList;
    };

    const addCropToList = () => {
        console.log(selectedProduceCategory, ":", selectedCrop, ":", selectedVariety, ":", selectedGrade)

        // const {produceId, produceName} = selectedProduce;
        // const {categoryName, categoryId} = selectedCategoryDetails;
        // const {cropName, cropId} = selectedCropDetails;
        
        // /* Update reference/existing arrays */
        // // Update original masterList
        // let duplicateMasterList = [...masterList];
        // remove(duplicateMasterList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        // updateMasterList(duplicateMasterList);
        
        // // Update produce list based on dropdown values
        // // let duplicateProduceList = [...produceListForMasterCategory];
        // // remove(duplicateProduceList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        // // setProduceListForMasterCategory(duplicateProduceList);
        
        // /* Table data manipulations start */
        // // Create entry data
        const entryData = {selectedProduceCategory, selectedCrop, selectedVariety, selectedGrade};
        
        //  // Update master list
        const updatedMasterList: any = [...addedMasterList, entryData];
        console.log("Master list", updatedMasterList);
        updateAddedMasterList(updatedMasterList);
        // /* Table data manipulations end */
    }
    
    return (
        <>
        <Row gutter={16}>
            <Col>
                <Title level={5}>Select all the produce you buy regularly</Title>
                <Text>Select Produce Category</Text>
                <Select
                    className="custom-select"
                    allowClear
                    placeholder="Please select"
                    onChange={handleMasterProduceChange}
                    style={{ width: '100%' }}
                >
                    {renderMasterProduceChildren(buyerStore.produceList)}
                </Select>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Produce</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {getProduceTypeData(buyerStore.cropsList)}
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Variety</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {getCategoryListData(buyerStore.varietyList)}
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Grade</Title>
                    { selectedVariety ? getGradeData(buyerStore.varietyList, selectedVariety) : [] }
                </div>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col>
                <Space direction="vertical">
                    <Title level={5}>My Master List</Title>
                    <Space>
                        <Search className="custom-search" placeholder="Search" />
                        <DefaultBtn icon={<FilterOutlined/>} content="Filter" />
                        </Space>
                </Space>
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <Table
                    className="margin-t-1em"
                    columns={masterListColumns({removeProduceEntry: (record: any) => {
                        console.log('removeProduceEntry', record)
                    }})}
                    pagination={ false }
                    rowClassName="custom-row"
                    scroll = {{y: 100}}
                    dataSource={addedMasterList}
                />
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <CancelBtn
                    className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                    onClick={() => {
                        setModalVisible(false);
                    }}
                />
                <Button
                    className="crop-modal-action-btn vikas-btn-radius"
                    type="primary"
                    onClick={() => {
                        dispatch(updateMasterlist(addedMasterList));
                        setModalVisible(false);
                    }}
                >
                    Done
                </Button>
            </Col>
        </Row>
        </>
    )
}

export default MasterList;
