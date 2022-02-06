import { ScenarioText, CountByCharacter } from './models'

export function aggregateCountByCharacter(
    scenarioText: ScenarioText
): CountByCharacter {
    const countByCharacter: {
        [character: string]: number
    } = {}

    for (const words of scenarioText) {
        const count = words.lines.reduce((acc, line) => {
            // Count length as code points instead of code units
            return acc + Array.from(line).length
        }, 0)

        if (countByCharacter[words.character] === undefined) {
            countByCharacter[words.character] = count
        } else {
            countByCharacter[words.character] += count
        }
    }

    return countByCharacter
}
