import { cloneDeep } from 'lodash';

export const selectedItemClass: any = {
    'cropType': 'selected-produce-item',
    'varietyType': 'selected-variety-item',
    'grade': 'selected-grade-item'
};

/** Render class name
 * 
 * @param { boolean } isSelected - True if selected
 * @param { string } entityType - Entity Type
 */
export const renderClassName = (isSelected: boolean, entityType: string) => {
    return isSelected ? selectedItemClass[entityType] : '';
};

/** Convert masterlist to grade structure
 * 
 * @param { Array<any> } masterList - Masterlist Array
 */
export const convertMasterListToGradeStructure = (masterList: Array<any>) => {
    let gradeDataStructure: any = {};
    masterList.forEach((masterCropDetails) => {
        const { produce_name, crop_name, category_name, grade_name } = masterCropDetails;
        gradeDataStructure = updateMasterCropDatastructure(grade_name, true, { gradeDataStructure, selectedProduceCategory: produce_name, selectedCrop: crop_name, selectedVariety: category_name })
    });
    return gradeDataStructure;
};

/** Update master crop data structure
 * 
 * @param { string } gradeSelection - Grade section
 * @param { boolean } isSelected - True if selected
 * @param { any } param2 
 */
export const updateMasterCropDatastructure = (
    gradeSelection: string,
    isSelected: boolean,
    { gradeDataStructure, selectedProduceCategory, selectedCrop, selectedVariety }: any
) => {
    const gradeDataStructreCopied = cloneDeep(gradeDataStructure);
    if (gradeDataStructreCopied[selectedProduceCategory]) {
        const allCropsDataFromProduce = gradeDataStructreCopied[selectedProduceCategory]
        if (allCropsDataFromProduce[selectedCrop]) {
            const allCategoryDataForCrop = allCropsDataFromProduce[selectedCrop]
            if (allCategoryDataForCrop[selectedVariety]) {
                const updatedCatGrade = { ...allCategoryDataForCrop[selectedVariety], [gradeSelection]: isSelected }
                Object.assign(gradeDataStructreCopied[selectedProduceCategory][selectedCrop], { [selectedVariety]: updatedCatGrade })
                // updateSelectedList( gradeDataStructreCopied)
                return gradeDataStructreCopied;
            } else {
                Object.assign(gradeDataStructreCopied[selectedProduceCategory][selectedCrop], { [selectedVariety]: { [gradeSelection]: isSelected } })
                return gradeDataStructreCopied;
            }
        } else {
            Object.assign(gradeDataStructreCopied[selectedProduceCategory], { [selectedCrop]: { [selectedVariety]: { [gradeSelection]: isSelected } } })
            return gradeDataStructreCopied;
        }
    } else {
        Object.assign(gradeDataStructreCopied, { [selectedProduceCategory]: { [selectedCrop]: { [selectedVariety]: { [gradeSelection]: isSelected } } } });
        return gradeDataStructreCopied;
    }
};
