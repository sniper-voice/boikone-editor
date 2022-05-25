import { ErrorRange } from './models'

export function testCharacterCount(text: string): ErrorRange[] {
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
