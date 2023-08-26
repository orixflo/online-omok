import { useEffect, useState } from 'react';

/**
 * @param {} game game data including player array, room state, turn, position
 * @returns playerArr
 */
export const useSetPlayer = (game) => {
    const [player, setPlayer] = useState([
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
    ]);

    useEffect(() => {
        const newPlayerArr = [];
        let pointer = game.position;

        for (let i = 0; i < game.player.length; i++) {
            if (game.roomState === 'ingame') {
                newPlayerArr.push({
                    name: game.player[pointer].nickname,
                    active: game.player[pointer].guestCode === game.player[game.turn].guestCode ? 'true' : 'false',
                });
            } else {
                newPlayerArr.push({ name: game.player[pointer].nickname, active: game.player[pointer].state === 'ready' ? 'true' : 'false' });
            }
            pointer += 1;
            if (pointer > game.player.length - 1) pointer = 0;
        }

        if (newPlayerArr.length < game.maxPlayer) {
            for (let i = newPlayerArr.length; i < game.maxPlayer; i++) {
                newPlayerArr.push({ name: '---', active: 'false' });
            }
        }

        setPlayer(newPlayerArr);
    }, [game]);

    return player;
};
