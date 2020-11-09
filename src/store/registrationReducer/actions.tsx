import { RegitrationFullFormModel, RegsitrationFormModel } from './types';

export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_BASIC_REGISTER_FORM = 'UPDATE_BASIC_REGISTER_FORM';
export const UPDATE_ENTITY_TYPE = 'UPDATE_ENTITY_TYPE';

export const updateForm = (formData: RegitrationFullFormModel) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};

export const updateEntityType = (entityType: string) => {
    return {
        type: UPDATE_ENTITY_TYPE,
        payload: entityType,
    };
};

export const updateBasicRegistrationData = (formData: RegsitrationFormModel) => {
    return {
        type: UPDATE_BASIC_REGISTER_FORM,
        payload: formData,
    };
};
