import { Lines, CharacterCounts, NarrativeLine, DialogueLine } from './models'

export function countCharacters(lines: Lines): CharacterCounts {
    return lines
        .filter(
            (line): line is NarrativeLine | DialogueLine =>
                line.type === 'dialogue' || line.type === 'narrative'
        )
        .map((line) => ({
            character: line.type === 'narrative' ? '0' : line.character.str,
            count: Array.from(line.text.str).length,
        }))
}
