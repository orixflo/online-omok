import { useEffect, useState } from "react";

/**
 * 
 * @param {*} game game data including player array, position, max player number
 * @param {*} chat chat data including emoji array
 * @returns sorted emoji array by player slot
 */
export const useSetEmoji = (game, chat) => {
    const [emoji, setEmoji] = useState([]);

    useEffect(() => {
        const newArr = [];
        let pointer = game.position;
        for (let i = 0; i < game.player.length; i++) {
            newArr.push(chat.emojiArr[pointer]);
            pointer += 1;
            if (pointer > game.player.length - 1) pointer = 0;
        }
        if (newArr.length < game.maxPlayer) {
            for (let i = newArr.length; i < game.maxPlayer; i++) {
                newArr.push('-');
            }
        }
        setEmoji(newArr);
    }, [chat.emojiArr]);

    return emoji;
}