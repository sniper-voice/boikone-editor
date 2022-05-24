import { countCharacters } from './countCharacters'
import { ErrorRange } from './models'

const fixtures = [
    {
        scenarioText: [],
        characterCounts: [],
    },
    {
        scenarioText: [
            {
                type: 'dialogue',
                character: {
                    str: 'ピエロ',
                    hankakuErrors: [],
                },
                text: {
                    str: 'なんなんだろうねぇこの状況',
                    countOverErrors: [],
                    hankakuErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'レディ',
                    hankakuErrors: [],
                },
                text: {
                    str: '綺麗な四つどもえ',
                    countOverErrors: [],
                    hankakuErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'エリート',
                    hankakuErrors: [],
                },
                text: {
                    str: 'その前に一ついいか',
                    countOverErrors: [],
                    hankakuErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'ガール',
                    hankakuErrors: [],
                },
                text: {
                    str: 'それはつまり',
                    countOverErrors: [],
                    hankakuErrors: [],
                },
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
                type: 'dialogue',
                character: {
                    str: 'スナイパー',
                    hankakuErrors: [],
                },
                text: {
                    str: '😀😃😄😁🤩',
                    countOverErrors: [],
                    hankakuErrors: [],
                },
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
