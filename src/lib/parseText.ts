import { ScenarioText } from './models'

type Words = {
    character: string
    lines: [string, ...string[]]
}

type ReduceResult = {
    prevCharacter: string | null
    scenarioText: Words[]
}

export function parseText(text: string): ScenarioText {
    const result = text
        .split('\n')
        .filter((line) => {
            return line.length > 0
        })
        .map<[string, string]>((line) => {
            const [first, second] = line.split('：', 2)
            if (second === undefined) {
                // If it only has a single element, it's a stage direction
                return ['0', first]
            } else {
                // Otherwize, it contains the name of a character and line
                return [first, second]
            }
        })
        .reduce<ReduceResult>(
            (result, [character, line]) => {
                if (result.prevCharacter === character) {
                    const previousWords = result.scenarioText.at(-1)
                    if (!previousWords) {
                        throw 'lastWords are empty'
                    }
                    previousWords.lines.push(line)
                } else {
                    result.scenarioText.push({
                        character,
                        lines: [line],
                    })
                }
                result.prevCharacter = character
                return result
            },
            { prevCharacter: null, scenarioText: [] }
        )
    return result.scenarioText
}
