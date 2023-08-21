const checkUserConnection = (userDataMap, guestCode) => {
    if (userDataMap.has(guestCode) === false) {
        throw new Error('disconnected');
    }
};

module.exports = checkUserConnection;