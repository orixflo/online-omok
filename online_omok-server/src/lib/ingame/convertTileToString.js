const replaceChar = (input, index, char) => {
    return input.substr(0, index) + char + input.substr(index + 1);
};

// array composed with coordinate and object(stone) convert to string
// ['1,0,B', '2,0,W', ...] => 'BW...'
const convertTileToString = (tile) => {
    let converted = 'N'.repeat(361);
    if (tile.length < 1) return converted;
    for (let i = 0; i < tile.length; i++) {
        converted = replaceChar(converted, parseInt(tile[i].split(',')[0]) + parseInt(tile[i].split(',')[1]) * 19, tile[i].split(',')[2]);
    }
    return converted;
};

module.exports = convertTileToString;
