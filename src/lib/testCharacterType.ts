import { ErrorRange } from './models'

export function testCharacterType(text: string): ErrorRange[] {
    const invalidCharacters = /[ -/:-@[-~a-zA-Z\uD800-\uDBFF\uDC00-\uDFFF]+/g

    const errors: ErrorRange[] = []

    for (const match of text.matchAll(invalidCharacters)) {
        if (match.index === undefined) {
            continue
        }

        errors.push({
            position: match.index,
            length: match[0].length,
        })
    }

    return errors
}
