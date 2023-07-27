const checkGuestCodeError = (userDataMap, generatedCode, maxSize) => {
    //  checking size of map
    if (userDataMap.size >= maxSize) {
        console.log('full size');
        return 'full';
    }
    // checking conflicted userCode
    for (let userCode of userDataMap.keys()) {
        if (userCode === generatedCode) {
            console.log('userCode conflict. regenerate code');
            return 'conflict';
        }
    }
    return 'success';
};

module.exports = checkGuestCodeError;
