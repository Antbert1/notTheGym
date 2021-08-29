export const SAVE_CLASSES = 'SAVE_CLASSES';
export const FILTERED_LIST = 'FILTERED_LIST';
export const PAGE_NUM = 'PAGE_NUM';
export const SELECTED_CLASS = 'SELECTED_CLASS';
export const EMAIL = 'EMAIL';

export function saveClasses(classes) {
    return {
        type: SAVE_CLASSES,
        classes,
    };
}

export function setFilteredList(filteredList) {
    return {
        type: FILTERED_LIST,
        filteredList,
    };
}

export function setPageNum(pageNum) {
    return {
        type: PAGE_NUM,
        pageNum,
    };
}

export function setSelectedClass(selectedClass) {
    return {
        type: SELECTED_CLASS,
        selectedClass,
    };
}

export function setEmail(email) {
    return {
        type: EMAIL,
        email,
    };
}

