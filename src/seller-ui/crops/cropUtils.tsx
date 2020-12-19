import React from 'react';
import { Select } from 'antd';
import { uniqBy } from 'lodash';
import { CropCategoryModel } from '../../store/sellerReducer/types';
const {Option} = Select

export const renderCategoryOptions = (categories: Array<string>) => {
    const categoryOptions = categories.map((category) => <Option key={category} value={category}>{category}</Option> )
    return categoryOptions;
}

export const renderSubCategoryOptions = (selectedCropDataList: Array<CropCategoryModel>) => {    
    const subCategoryOptions = uniqBy(selectedCropDataList, 'variety').map((curCropData: CropCategoryModel) => {
        const {variety} = curCropData;
        return <Option key={variety} value={variety}>{variety}</Option>
    })
    return subCategoryOptions;
}

export const renderGradeOptionsForSubCategory = (selectedCropDataList: Array<CropCategoryModel>, subCategory: string) => {
    console.log('subCategory', subCategory)
    console.log('filter', selectedCropDataList.filter((cropData: CropCategoryModel) => cropData.variety === subCategory))
    const gradeOptions = selectedCropDataList
                            .filter((cropData: CropCategoryModel) => cropData.variety === subCategory)
                            .map(({grade}: CropCategoryModel, index) => <Option key={`${grade}-${index}`} value={grade}> {grade} </Option>)
    return gradeOptions
}