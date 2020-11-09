import { UPDATE_FORM, UPDATE_ENTITY_TYPE, UPDATE_BASIC_REGISTER_FORM } from './actions';

const INITIAL_STATE = {
    entityType: '',
    formData: {}
};

const reducer = (state = INITIAL_STATE, action: any) => {

    switch (action.type) {
        case UPDATE_FORM:
            return { ...state, formData: action.payload };
        
        case UPDATE_ENTITY_TYPE:
            return { ...state, entityType: action.payload };

        case UPDATE_BASIC_REGISTER_FORM:
            return { ...state, formData: action.payload };
    
        default: return state;
    }

};

export default reducer;