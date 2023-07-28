// check if there is a stone at coordinate that user want to place stone.
const checkConflict = (prevTile, target) => {
    for (let i = 0; i < prevTile.length; i++) {
        if (prevTile[i].includes(target.slice(0, -2))) return true;
    }
    return false;
};

module.exports = checkConflict;
