const generateGuestCode = (min, max) => {
    // min 0, max 9999
    let guestCode = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    for (let i = guestCode.length; i < 4; i++) {
        guestCode = '0'.concat(guestCode);
    }
    return guestCode;
};

module.exports = generateGuestCode;
