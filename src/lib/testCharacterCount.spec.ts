import { testCharacterCount } from './testCharacterCount'

const fixtures = [
    {
        text: 'なんなんだろうねぇこの状況',
        errorRanges: [],
    },
    {
        text: '０１２３４５６７８９'.repeat(10),
        errorRanges: [],
    },
    {
        text: '０１２３４５６７８９'.repeat(10) + 'あ',
        errorRanges: [
            {
                position: 100,
                length: 1,
            },
        ],
    },
]

for (const { text, errorRanges } of fixtures) {
    test('testCharacterCount counts the number of characters and return errors when it exceeds the limit', () => {
        expect(testCharacterCount(text)).toMatchObject(errorRanges)
    })
}
