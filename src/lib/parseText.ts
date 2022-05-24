import { ScenarioText, Line, ErrorRange } from './models'

type ReduceResult = {
    prevCharacter: string | null
    scenarioText: Line[]
}

function splitLine(rawLine: string): Line {
    const [first, second] = rawLine.split('：', 2)
    if (second === undefined) {
        return {
            type: 'no_colon',
            text: {
                str: first,
                noColonErrors: [
                    {
                        position: 0,
                        length: first.length,
                    },
                ],
                hankakuErrors: [],
            },
        }
    }

    if (first === '0') {
        return {
            type: 'narrative',
            text: {
                str: second,
                hankakuErrors: [],
                countOverErrors: [],
            },
        }
    }

    return {
        type: 'dialogue',
        character: {
            str: first,
            hankakuErrors: [],
        },
        text: {
            str: second,
            hankakuErrors: [],
            countOverErrors: [],
        },
    }
}

function testCharacterCount(text: string): ErrorRange[] {
    // Convert the array of code unit to the arrya of characters
    const characters = Array.from(text)
    if (characters.length > 100) {
        const leftPart = characters.slice(0, 100).join('')
        return [
            {
                position: leftPart.length,
                length: text.length - leftPart.length,
            },
        ]
    }

    return []
}

function testCharacterType(text: string): ErrorRange[] {
    const asciiSymbols = /[ -/:-@[-~a-zA-Z]*/g

    return []
}

export function parseText(text: string): ScenarioText {
    return (
        text
            .split('\n')
            // Boikone just ignores empty lines
            .filter((line) => {
                return line.length > 0
            })
            .map(splitLine)
            // Boikone just ignores empty lines that have character name or text
            .filter(
                (line) =>
                    line.type === 'no_colon' ||
                    (line.type === 'narrative' && line.text.str !== '') ||
                    (line.type === 'dialogue' &&
                        line.character.str !== '' &&
                        line.text.str !== '')
            )
            .map((line) => {
                switch (line.type) {
                    case 'no_colon':
                        return line
                    case 'narrative':
                        return {
                            ...line,
                            text: {
                                ...line.text,
                                countOverErrors: testCharacterCount(
                                    line.text.str
                                ),
                            },
                        }
                    case 'dialogue':
                        return {
                            ...line,
                            text: {
                                ...line.text,
                                countOverErrors: testCharacterCount(
                                    line.text.str
                                ),
                            },
                        }
                }

                throw 'unrecognized line type'
            })
    )
}
