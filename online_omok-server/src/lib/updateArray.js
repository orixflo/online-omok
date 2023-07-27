const updateArray = (array, index, element) => {
    const nextArr = [...array.slice(0, index), element, ...array.slice(index + 1)];
    return nextArr;
};

module.exports = updateArray;
