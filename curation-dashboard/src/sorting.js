function descendingComparatorNumber(a, b, orderBy) {
    const aa = (a[orderBy] !== null) ? a[orderBy] : -1e99;  // handle null as negative infinity
    const bb = (b[orderBy] !== null) ? b[orderBy] : -1e99;
    if (bb < aa) {
        return -1;
    }
    if (bb > aa) {
        return 1;
    }
    return 0;
}

function descendingComparatorString(a, b, orderBy) {
    const aa = (a[orderBy] !== null) ? a[orderBy].toLowerCase() : "";  // handle null as empty string, and case-insensitive sorting
    const bb = (b[orderBy] !== null) ? b[orderBy].toLowerCase() : "";
    if (bb < aa) {
        return -1;
    }
    if (bb > aa) {
        return 1;
    }
    return 0;
}

function descendingComparatorBoolean(a, b, orderBy) {
    const aa = a[orderBy];
    const bb = b[orderBy];
    if (bb < aa) {
        return -1;
    }
    if (bb > aa) {
        return 1;
    }
    return 0;
}

const comparatorFunctionMap = {
    boolean: descendingComparatorBoolean,
    string: descendingComparatorString,
    number: descendingComparatorNumber
};


export function getComparator(order, orderBy, sortType) {
    const fn = comparatorFunctionMap[sortType];
    return order === 'desc'
        ? (a, b) => fn(a, b, orderBy)
        : (a, b) => -fn(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    const sortedArray = stabilizedThis.map((el) => el[0]);
    return sortedArray;
}
