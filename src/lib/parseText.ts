import { Lines, Line } from './models'
import { testCharacterCount } from './testCharacterCount'
import { testCharacterType } from './testCharacterType'

function splitLine({
    line,
    position,
}: {
    line: string
    position: number
}): Line {
    const [first, second] = line.split('：', 2)
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
                characterTypeErrors: [],
            },
            position,
        }
    }

    if (first === '0') {
        return {
            type: 'narrative',
            text: {
                str: second,
                characterTypeErrors: [],
                countOverErrors: [],
            },
        }
    }

    return {
        type: 'dialogue',
        character: {
            str: first,
            characterTypeErrors: [],
        },
        text: {
            str: second,
            characterTypeErrors: [],
            countOverErrors: [],
        },
    }
}

export function parseText(text: string): Lines {
    let positionCounter = 0
    return (
        text
            .split('\n')
            .reduce<{ line: string; position: number }[]>((acc, curr) => {
                acc.push({ line: curr, position: positionCounter })
                positionCounter += curr.length + 1 // line + '\n'
                return acc
            }, [])
            // Boikone just ignores empty lines
            .filter(({ line }) => {
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
                        return {
                            ...line,
                            text: {
                                ...line.text,
                                characterTypeErrors: testCharacterType(
                                    line.text.str
                                ),
                            },
                        }
                    case 'narrative':
                        return {
                            ...line,
                            text: {
                                ...line.text,
                                countOverErrors: testCharacterCount(
                                    line.text.str
                                ),
                                characterTypeErrors: testCharacterType(
                                    line.text.str
                                ),
                            },
                        }
                    case 'dialogue':
                        return {
                            ...line,
                            character: {
                                ...line.character,
                                characterTypeErrors: testCharacterType(
                                    line.character.str
                                ),
                            },
                            text: {
                                ...line.text,
                                countOverErrors: testCharacterCount(
                                    line.text.str
                                ),
                                characterTypeErrors: testCharacterType(
                                    line.text.str
                                ),
                            },
                        }
                }

                throw Error('unrecognized line type')
            })
    )
}
