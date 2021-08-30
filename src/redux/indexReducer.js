import { combineReducers } from 'redux';
import { SAVE_CLASSES, FILTERED_LIST, PAGE_NUM, SELECTED_CLASS, EMAIL, PROFILE } from './indexActions';
const dataState = {
    classes: [],
    filteredList: [],
    pageNum: 0,
    selectedClass: {},
    email: '',
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case SAVE_CLASSES:
            state = Object.assign({}, state, { classes: action.classes });
            return state;
        case FILTERED_LIST:
            state = Object.assign({}, state, { filteredList: action.filteredList });
            return state;
        case PAGE_NUM:
            state = Object.assign({}, state, { pageNum: action.pageNum });
            return state;
        case SELECTED_CLASS:
            state = Object.assign({}, state, { selectedClass: action.selectedClass });
            return state;
        case EMAIL:
            state = Object.assign({}, state, { email: action.email });
            return state;
        case PROFILE:
            state = Object.assign({}, state, { profile: action.profile });
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;
