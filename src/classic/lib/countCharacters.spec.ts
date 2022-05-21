import { countCharacters } from './countCharacters'

const fixtures = [
    {
        scenarioText: [],
        characterCounts: [],
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
    },
    {
        scenarioText: [
            {
                character: '助手',
                lines: [
                    '作業効率爆上がり・・・(ゴクリ',
                    'す、すごいじゃないですか！',
                ],
            },
        ],
        characterCounts: [
            {
                character: '助手',
                count: 28,
            },
        ],
    },
    {
        scenarioText: [
            {
                character: 'スナイパー',
                lines: ['😀😃😄😁🤩'],
            },
        ],
        characterCounts: [
            {
                character: 'スナイパー',
                count: 5,
            },
        ],
    },
] as const

for (const { scenarioText, characterCounts } of fixtures) {
    test('countCharacters counts the amount of characters for each word', () => {
        expect(countCharacters(scenarioText)).toMatchObject(characterCounts)
    })
}
