import { countCharacters } from './countCharacters'

const fixtures = [
    {
        scenarioText: [],
        characterCounts: {},
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
        characterCounts: {
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
        characterCounts: {
            スナイパー: 5,
        },
    },
] as const

for (const { scenarioText, characterCounts } of fixtures) {
    test('countCharacters returns the amount of words by character', () => {
        expect(countCharacters(scenarioText)).toMatchObject(characterCounts)
    })
}
