const convertSign = (number) => {
    if (Math.sign(number) === 1) {
        return -1 * number;
    }
    if (Math.sign(number) === -1) {
        return -1 * number;
    }
};

const checkGameEnd = (prevTile, target) => {
    const posX = parseInt(target.split(',')[0]);
    const posY = parseInt(target.split(',')[1]);
    const obj = target.split(',')[2];

    for (let i = 0; i < 4; i++) {
        let count = 1;
        let direction = -1;
        let length = 0;
        let step = 0;

        for (;;) {
            // # ↓
            if (i === 0) {
                length = length + direction;
                if (prevTile.includes(`${posX},${posY + length},${obj}`)) {
                    count += 1;
                    // 6 mok
                    if (count > 5) {
                        break;
                    }
                    continue;
                } else {
                    direction = 1;
                    length = 0;
                    step += 1;
                }
                if (step > 1) {
                    // 5 mok win
                    if (count === 5) {
                        return true;
                    }
                    break;
                }
            }
            // # ↘
            if (i === 1) {
                length = length + direction;
                if (prevTile.includes(`${posX + length},${posY + length},${obj}`)) {
                    count += 1;
                    // 6 mok
                    if (count > 5) {
                        break;
                    }
                    continue;
                } else {
                    direction = 1;
                    length = 0;
                    step += 1;
                }
                if (step > 1) {
                    // 5 mok win
                    if (count === 5) {
                        return true;
                    }
                    break;
                }
            }
            // # →
            if (i === 2) {
                length = length + direction;
                if (prevTile.includes(`${posX + length},${posY},${obj}`)) {
                    count += 1;
                    // 6 mok
                    if (count > 5) {
                        break;
                    }
                    continue;
                } else {
                    direction = 1;
                    length = 0;
                    step += 1;
                }
                if (step > 1) {
                    // 5 mok win
                    if (count === 5) {
                        return true;
                    }
                    break;
                }
            }
            // # ↗
            if (i === 3) {
                length = length + direction;
                if (prevTile.includes(`${posX + convertSign(length)},${posY + length},${obj}`)) {
                    count += 1;
                    // 6 mok
                    if (count > 5) {
                        break;
                    }

                    continue;
                } else {
                    direction = 1;
                    length = 0;
                    step += 1;
                }
                if (step > 1) {
                    // 5 mok win
                    if (count === 5) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
};

module.exports = checkGameEnd;
