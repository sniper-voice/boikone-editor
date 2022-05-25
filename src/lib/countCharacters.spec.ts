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
                    characterTypeErrors: [],
                },
                text: {
                    str: 'なんなんだろうねぇこの状況',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'レディ',
                    characterTypeErrors: [],
                },
                text: {
                    str: '綺麗な四つどもえ',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'エリート',
                    characterTypeErrors: [],
                },
                text: {
                    str: 'その前に一ついいか',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'ガール',
                    characterTypeErrors: [],
                },
                text: {
                    str: 'それはつまり',
                    countOverErrors: [],
                    characterTypeErrors: [],
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
                    characterTypeErrors: [],
                },
                text: {
                    str: '😀😃😄😁🤩',
                    countOverErrors: [],
                    characterTypeErrors: [],
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
