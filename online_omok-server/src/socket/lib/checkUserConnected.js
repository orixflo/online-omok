const checkUserConnected = (userDataMap, guestCode) => {
    if (userDataMap.has(guestCode) === false) {
        throw new Error('disconnected');
    }
};

module.exports = checkUserConnected;