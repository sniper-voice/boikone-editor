import { parseText } from './parseText'

const fixtures = [
    {
        // Single stage direction
        sourceText: '0：部屋に入り、鍵をしめるふたり',
        scenarioText: [
            {
                character: '0',
                lines: ['部屋に入り、鍵をしめるふたり'],
            },
        ],
    },
    {
        // Single stage direction and one set of words
        sourceText: `0：部屋に入り、鍵をしめるふたり
亜蘭：「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」`,
        scenarioText: [
            {
                character: '0',
                lines: ['部屋に入り、鍵をしめるふたり'],
            },
            {
                character: '亜蘭',
                lines: [
                    '「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」',
                ],
            },
        ],
    },
    {
        // Two successive sets of words for the same character
        sourceText: `コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
コウスケ：ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                character: 'コウスケ',
                lines: [
                    '「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。',
                    'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                ],
            },
        ],
    },
    {
        // Text contains empty lines
        sourceText: `亜蘭：「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」


コウスケ：「（息が荒い）良かった。......来たよ！」`,
        scenarioText: [
            {
                character: '亜蘭',
                lines: [
                    '「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」',
                ],
            },
            {
                character: 'コウスケ',
                lines: ['「（息が荒い）良かった。......来たよ！」'],
            },
        ],
    },
    {
        // Two successive sets of words for the same character
        sourceText: `コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
コウスケ：ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                character: 'コウスケ',
                lines: [
                    '「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。',
                    'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                ],
            },
        ],
    },
    {
        // Two successive sets of words but one contains no character
        sourceText: `コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」`,
        scenarioText: [
            {
                character: 'コウスケ',
                lines: [
                    '「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。',
                    'ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」',
                ],
            },
        ],
    },
    {
        // The first line contains no character
        sourceText: '部屋に入り、鍵をしめるふたり',
        scenarioText: [
            {
                character: '0',
                lines: ['部屋に入り、鍵をしめるふたり'],
            },
        ],
    },
]

for (const { sourceText, scenarioText } of fixtures) {
    test('parseText returns structured text', () => {
        expect(parseText(sourceText)).toMatchObject(scenarioText)
    })
}
