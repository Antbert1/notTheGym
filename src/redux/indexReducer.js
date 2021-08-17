import { combineReducers } from 'redux';
import { SAVE_CLASSES, FILTERED_LIST } from './indexActions';
const dataState = {
    classes: [],
    filteredList: [],
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case SAVE_CLASSES:
            state = Object.assign({}, state, { classes: action.classes });
            return state;
        case FILTERED_LIST:
            state = Object.assign({}, state, { filteredList: action.filteredList });
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;
