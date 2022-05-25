import { parseText } from './parseText'

const fixtures = [
    {
        // Single stage direction
        sourceText: '0：部屋に入り、鍵をしめるふたり',
        scenarioText: [
            {
                type: 'narrative',
                text: {
                    str: '部屋に入り、鍵をしめるふたり',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Single stage direction and one set of words
        sourceText: `0：部屋に入り、鍵をしめるふたり
亜蘭：「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」`,
        scenarioText: [
            {
                type: 'narrative',
                text: {
                    str: '部屋に入り、鍵をしめるふたり',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: '亜蘭',
                    characterTypeErrors: [],
                },
                text: {
                    str: '「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Two successive sets of words for the same character
        sourceText: `コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
コウスケ：ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                type: 'dialogue',
                character: {
                    str: 'コウスケ',
                    characterTypeErrors: [],
                },
                text: {
                    str: '「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: 'コウスケ',
                    characterTypeErrors: [],
                },
                text: {
                    str: 'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Two successive sets of words but one contains no character
        sourceText: `コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                type: 'dialogue',
                character: {
                    str: 'コウスケ',
                    characterTypeErrors: [],
                },
                text: {
                    str: '「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
            {
                type: 'no_colon',
                text: {
                    str: 'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                    noColonErrors: [
                        {
                            position: 0,
                            length: 45,
                        },
                    ],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // The first line contains no character
        sourceText: '部屋に入り、鍵をしめるふたり',
        scenarioText: [
            {
                type: 'no_colon',
                text: {
                    str: '部屋に入り、鍵をしめるふたり',
                    noColonErrors: [
                        {
                            position: 0,
                            length: 14,
                        },
                    ],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Empty line
        sourceText: `コウスケ：
コウスケ：ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                type: 'dialogue',
                character: {
                    str: 'コウスケ',
                    characterTypeErrors: [],
                },
                text: {
                    str: 'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                    countOverErrors: [],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Line over 100 characters
        sourceText: `コウスケ：あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ超過`,
        scenarioText: [
            {
                type: 'dialogue',
                character: {
                    str: 'コウスケ',
                    characterTypeErrors: [],
                },
                text: {
                    str: 'あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ超過',
                    countOverErrors: [
                        {
                            position: 100,
                            length: 2,
                        },
                    ],
                    characterTypeErrors: [],
                },
            },
        ],
    },
    {
        // Character type validation
        sourceText: `0：部😀屋に入り、鍵をしめるふたり
亜😀蘭：「😀（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」`,
        scenarioText: [
            {
                type: 'narrative',
                text: {
                    str: '部😀屋に入り、鍵をしめるふたり',
                    countOverErrors: [],
                    characterTypeErrors: [
                        {
                            position: 1,
                            length: 2,
                        },
                    ],
                },
            },
            {
                type: 'dialogue',
                character: {
                    str: '亜😀蘭',
                    characterTypeErrors: [
                        {
                            position: 1,
                            length: 2,
                        },
                    ],
                },
                text: {
                    str: '「😀（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」',
                    countOverErrors: [],
                    characterTypeErrors: [
                        {
                            position: 1,
                            length: 2,
                        },
                    ],
                },
            },
        ],
    },
]

for (const { sourceText, scenarioText } of fixtures) {
    test('parseText returns structured text', () => {
        expect(parseText(sourceText)).toMatchObject(scenarioText)
    })
}
