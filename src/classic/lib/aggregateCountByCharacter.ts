import { CharacterCounts, CountByCharacter } from './models'

export function aggregateCountByCharacter(
    characterCounts: CharacterCounts
): CountByCharacter {
    const countByCharacter: {
        [character: string]: number
    } = {}

    for (const { character, count } of characterCounts) {
        if (countByCharacter[character] === undefined) {
            countByCharacter[character] = count
        } else {
            countByCharacter[character] += count
        }
    }

    return countByCharacter
}
