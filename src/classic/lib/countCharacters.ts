import { ScenarioText, CharacterCounts } from './models'

export function countCharacters(scenarioText: ScenarioText): CharacterCounts {
    return scenarioText.map(({ character, lines }) => ({
        character,
        count: lines.reduce((acc, line) => {
            // Count length as code points instead of code units
            return acc + Array.from(line).length
        }, 0),
    }))
}
