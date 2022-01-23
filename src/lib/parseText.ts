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
        .reduce<ReduceResult>(
            (result, characterAndLine) => {
                const [first, second] = characterAndLine.split('：', 2)
                const [character, line] =
                    second === undefined
                        ? // If it only has a single element, the character is derived from the previous line.
                          // And if it's the first line of the text, it's a stage direction.
                          [result.prevCharacter ?? '0', first]
                        : // Otherwize, it contains the name of a character and line
                          [first, second]

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
