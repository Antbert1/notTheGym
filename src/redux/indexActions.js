export const SAVE_CLASSES = 'SAVE_CLASSES';
export const FILTERED_LIST = 'FILTERED_LIST';

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
