import { aggregateCountByCharacter } from './aggregateCountByCharacter'

const fixtures = [
    {
        scenarioText: [],
        countByCharacter: {},
    },
    {
        scenarioText: [
            {
                character: 'ピエロ',
                lines: ['なんなんだろうねぇこの状況'],
            },
            {
                character: 'レディ',
                lines: ['綺麗な四つどもえ'],
            },
            {
                character: 'エリート',
                lines: ['その前に一ついいか'],
            },
            {
                character: 'ガール',
                lines: ['それはつまり'],
            },
        ],
        countByCharacter: {
            レディ: 8,
            ピエロ: 13,
            エリート: 9,
            ガール: 6,
        },
    },
    {
        scenarioText: [
            {
                character: 'スナイパー',
                lines: ['😀😃😄😁🤩'],
            },
        ],
        countByCharacter: {
            スナイパー: 5,
        },
    },
] as const

for (const { scenarioText, countByCharacter } of fixtures) {
    test('countCharacters returns the amount of words by character', () => {
        expect(aggregateCountByCharacter(scenarioText)).toMatchObject(
            countByCharacter
        )
    })
}
