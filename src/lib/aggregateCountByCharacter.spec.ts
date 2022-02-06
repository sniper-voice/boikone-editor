import { aggregateCountByCharacter } from './aggregateCountByCharacter'

const fixtures = [
    {
        characterCounts: [],
        countByCharacter: {},
    },
    {
        characterCounts: [
            {
                character: 'ピエロ',
                count: 13,
            },
            {
                character: 'レディ',
                count: 8,
            },
            {
                character: 'エリート',
                count: 9,
            },
            {
                character: 'ガール',
                count: 6,
            },
        ],
        countByCharacter: {
            レディ: 8,
            ピエロ: 13,
            エリート: 9,
            ガール: 6,
        },
    },
] as const

for (const { characterCounts, countByCharacter } of fixtures) {
    test('countCharacters returns the amount of words by character', () => {
        expect(aggregateCountByCharacter(characterCounts)).toMatchObject(
            countByCharacter
        )
    })
}
