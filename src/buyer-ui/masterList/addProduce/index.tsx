import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Select, List, Typography, Button, Table } from 'antd';
import {uniqBy, remove} from 'lodash';
import {mockMasterFlatList} from '../../../store/mockMasterList';
import { masterListColumns } from './../masterListTable.model';
import { flatMasterListType } from '../../../store/buyerReducer/types';
import { updateMasterlist } from '../../../store/buyerReducer/actions';
const { Option } = Select;
const { Title } = Typography;

const MasterList = (props: any) => {
    const {setModalVisible} = props
    const dispatch = useDispatch();
    const [masterList, updateMasterList] = useState(mockMasterFlatList)
    const [produceListForMasterCategory, setProduceListForMasterCategory] = useState([]);
    const [selectedProduce, setSelectedProduce] = useState({produceId: '', produceName: ''});
    const [selectedCropDetails, setSelectedCropDetails] = useState({cropId: '', cropName: ''});
    const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({categoryId: '', categoryName: ''});
    const [addedMasterList, updateAddedMasterList] = useState([])
    
    /* On change of master produce selection*/
    const handleMasterProduceChange = (value: Array<any>, option: any) => {
        value.forEach((productName) => {
            const filteredLi = masterList.filter((prod) => prod.produce_id === productName)
            const updatedArr: any = [...produceListForMasterCategory, ...filteredLi]
            setProduceListForMasterCategory(updatedArr)  
        })
    }

    /* Show options for master produce details */
    const renderMasterProduceChildren = () => {
        const uniqueProduce = uniqBy(masterList, 'produce_id')
        return (
            <>
                {
                    uniqueProduce.map((produce) => {
                        const {produce_id, produce_name} = produce
                        return <Option key={produce_id} value={produce_id}>{produce_name}</Option> 
                    })
                }
            </>
        )

    }

    /* Get/Show Crops for the selected master produce */
    const getProduceTypeData = (): Array<{produceId: string, produceName: string, cropId: string, cropName: string}> => {
        const uniqueProduce: Array<flatMasterListType> = uniqBy(produceListForMasterCategory, 'crop_id')
        return uniqueProduce.map((productData) => {
            return {
                produceId: productData.produce_id,
                produceName: productData.produce_name,
                cropId: productData.crop_id,
                cropName: productData.crop_name
            }
        })
    }

    /* Show categories for the selected Crop */
    const getCategoryListData = () => {
        /* Filter the categories from the crop list based on crop selected */
        const filteredCrops: Array<flatMasterListType> = produceListForMasterCategory.filter(
            (produce: flatMasterListType) => produce.crop_id === selectedCropDetails.cropId
        )
        
        /* Since its a flat array, and there might be multiple entries of same category, 
            get only the unique categories to be displayed */
        const uniqueCategories: Array<{categoryID: string, categoryName: string}> = uniqBy(filteredCrops, 'category_id').map((matchedCrop: flatMasterListType) => {
            return ({
                categoryID: matchedCrop.category_id,
                categoryName: matchedCrop.category_name
            })
        })        
        return uniqueCategories;
    }

    /* Show grades for the selected Category */
    const getGradeData = () => {
        const uniqueCrop: Array<{gradeID: string, gradeName: string}> = produceListForMasterCategory.filter(
            (produce: flatMasterListType) => produce.category_id === selectedCategoryDetails.categoryId
        ).map((matchedCrop: flatMasterListType) => {
            return ({
                gradeID: matchedCrop.grade_id,
                gradeName: matchedCrop.grade_name
            })
        })
        return uniqueCrop;
    }

    const addCropToList = ({gradeId, gradeName}: {gradeId: string, gradeName: string}) => {
        const {produceId, produceName} = selectedProduce
        const {categoryName, categoryId} = selectedCategoryDetails;
        const {cropName, cropId} = selectedCropDetails;
        
        /* Update reference/existing arrays */
        // Update original masterList
        let duplicateMasterList = [...masterList]
        remove(duplicateMasterList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        updateMasterList(duplicateMasterList);
        
        // Update produce list based on dropdown values
        let duplicateProduceList = [...produceListForMasterCategory]
        remove(duplicateProduceList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        setProduceListForMasterCategory(duplicateProduceList);
        
        /* Table data manipulations start */
        // Create entry data
        const entryData = {categoryName, cropName, categoryId, cropId, produceId, produceName, gradeId, gradeName}
        // Update master list
        const updatedMasterList: any = [...addedMasterList, entryData]
        updateAddedMasterList(updatedMasterList)
        /* Table data manipulations end */
    }

    return (
        <>
        <Row gutter={16}>
            <Col span={8}>
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    onChange={handleMasterProduceChange}
                    style={{ width: '100%' }}
                >
                    {renderMasterProduceChildren()}
                </Select>
            </Col>
        </Row>
        <Row gutter={16} className='margin-t-1em'>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<Title level={3}>Crops</Title>}
                    bordered
                    dataSource={getProduceTypeData()}
                    renderItem={(item: any) => {
                        return (
                            <List.Item  
                                onClick={(options: any) => {
                                    setSelectedProduce({produceId: item.produceId, produceName: item.produceName})
                                    setSelectedCropDetails({cropId: item.cropId, cropName: item.cropName})
                                }}
                                key={item.cropId}
                            >
                                {item.cropName}
                            </List.Item>
                        )
                    }}
                />
            </Col>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<Title level={3}>Category</Title>}
                    bordered
                    dataSource={selectedCropDetails?.cropId ? getCategoryListData() : []}
                    renderItem={(item: any) => {
                        return (
                            <List.Item
                                onClick={(options: any) => {
                                    setSelectedCategoryDetails({categoryId: item.categoryID, categoryName: item.categoryName})
                                }} 
                                key={item.categoryID}
                            >
                                {item.categoryName}
                            </List.Item>
                        )   
                    }}
                />
            </Col>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<Title level={3}>Grade</Title>}
                    bordered
                    dataSource={selectedCategoryDetails?.categoryId ? getGradeData(): []}
                    renderItem={(item: any) =>
                        <> 
                        <List.Item
                            actions={[<Button onClick={() => addCropToList({gradeId: item.gradeID, gradeName: item.gradeName})}>Add</Button>]} 
                            key={`${selectedCategoryDetails?.categoryId}-${item.gradeID}`}
                        >
                            {item.gradeName}
                        </List.Item>
                        </>
                    }
                />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Table
                    className="margin-t-1em"
                    columns={masterListColumns({removeProduceEntry: (record: any) => {
                        console.log('removeProduceEntry', record)
                    }})}
                    dataSource={addedMasterList}
                />
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <Button
                    className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                    type="text"
                    htmlType="button"
                    onClick={() => {
                        setModalVisible(false);
                    }}
                >
                    Cancel
                </Button>
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