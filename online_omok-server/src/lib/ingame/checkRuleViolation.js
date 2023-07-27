const convertSign = (number) => {
    if (Math.sign(number) === 1) {
        return -1 * number;
    }
    if (Math.sign(number) === -1) {
        return -1 * number;
    }
};

const checkRuleViolation = (prevTile, target) => {
    const posX = parseInt(target.split(',')[0]);
    const posY = parseInt(target.split(',')[1]);
    const obj = target.split(',')[2];
    let totalOpenRows = 0;
    let opponent = 'W';
    if (obj === 'W') opponent = 'B';

    for (let i = 0; i < 4; i++) {
        let step = 0;
        let turn = 0;
        let direction = -1;
        let length = 0;
        let emptyCount = 0;
        let stoneCount = 1;

        for (;;) {
            // # ↓
            if (i === 0) {
                if (step > 1) {
                    if (emptyCount >= 4 && stoneCount === 3) totalOpenRows += 1;
                    if (emptyCount === 3 && stoneCount === 3) totalOpenRows += 0.5;
                    break;
                }
                length = length + direction;
                if (prevTile.includes(`${posX},${posY + length},${obj}`)) {
                    stoneCount += 1;
                    continue;
                } else if (prevTile.includes(`${posX},${posY + length},${opponent}`)) {
                    direction = 1;
                    length = 0;
                    turn = 0;
                    step += 1;
                    continue;
                } else if (posY + length < 0 || posY + length > 18) {
                    length = 0;
                    direction = 1;
                    step += 1;
                    turn = 0;
                    continue;
                } else {
                    turn += 1;
                    if (turn > 2) {
                        direction = 1;
                        length = 0;
                        step += 1;
                        turn = 0;
                        continue;
                    }
                    emptyCount += 1;
                }
            }
            // # ↘
            if (i === 1) {
                if (step > 1) {
                    if (emptyCount >= 4 && stoneCount === 3) totalOpenRows += 1;
                    if (emptyCount === 3 && stoneCount === 3) totalOpenRows += 0.5;
                    break;
                }
                length = length + direction;
                if (prevTile.includes(`${posX + length},${posY + length},${obj}`)) {
                    stoneCount += 1;
                    continue;
                } else if (prevTile.includes(`${posX + length},${posY + length},${opponent}`)) {
                    direction = 1;
                    length = 0;
                    turn = 0;
                    step += 1;
                    continue;
                } else if (posX + length < 0 || posY + length < 0 || posX + length > 18 || posY + length > 18) {
                    length = 0;
                    direction = 1;
                    step += 1;
                    turn = 0;
                    continue;
                } else {
                    turn += 1;
                    if (turn > 2) {
                        direction = 1;
                        length = 0;
                        step += 1;
                        turn = 0;
                        continue;
                    }
                    emptyCount += 1;
                }
            }
            // # →
            if (i === 2) {
                if (step > 1) {
                    if (emptyCount >= 4 && stoneCount === 3) totalOpenRows += 1;
                    if (emptyCount === 3 && stoneCount === 3) totalOpenRows += 0.5;
                    break;
                }
                length = length + direction;
                if (prevTile.includes(`${posX + length},${posY},${obj}`)) {
                    stoneCount += 1;
                    continue;
                } else if (prevTile.includes(`${posX + length},${posY},${opponent}`)) {
                    direction = 1;
                    length = 0;
                    turn = 0;
                    step += 1;
                    continue;
                } else if (posX + length < 0 || posX + length > 18) {
                    length = 0;
                    direction = 1;
                    step += 1;
                    turn = 0;
                    continue;
                } else {
                    turn += 1;
                    if (turn > 2) {
                        direction = 1;
                        length = 0;
                        step += 1;
                        turn = 0;
                        continue;
                    }
                    emptyCount += 1;
                }
            }
            // # ↗
            if (i === 3) {
                if (step > 1) {
                    if (emptyCount >= 4 && stoneCount === 3) totalOpenRows += 1;
                    if (emptyCount === 3 && stoneCount === 3) totalOpenRows += 0.5;
                    break;
                }
                length = length + direction;
                if (prevTile.includes(`${posX + convertSign(length)},${posY + length},${obj}`)) {
                    stoneCount += 1;
                    continue;
                } else if (prevTile.includes(`${posX + convertSign(length)},${posY + length},${opponent}`)) {
                    direction = 1;
                    length = 0;
                    turn = 0;
                    step += 1;
                    continue;
                } else if (posX + convertSign(length) > 18 || posY + length < 0 || posX + convertSign(length) < 0 || posY + length > 18) {
                    length = 0;
                    direction = 1;
                    step += 1;
                    turn = 0;
                    continue;
                } else {
                    turn += 1;
                    if (turn > 2) {
                        direction = 1;
                        length = 0;
                        step += 1;
                        turn = 0;
                        continue;
                    }
                    emptyCount += 1;
                }
            }
        }

        // # in case of rule violation
        if (totalOpenRows > 1) {
            return true;
        }
    }
    return false;
};

module.exports = checkRuleViolation;
