import { testCharacterType } from './testCharacterType'

const fixtures = [
    {
        text: 'なんなんだろうねぇこの状況',
        errorRanges: [],
    },
    {
        // Boikone permits tabs
        text: 'なんなんだろ\tうねぇこの状況',
        errorRanges: [],
    },
    {
        // Boikone denies ASCII alphabet
        text: 'abcde',
        errorRanges: [
            {
                position: 0,
                length: 5,
            },
        ],
    },
    {
        text: 'あいうえおabcdeかきくけこ',
        errorRanges: [
            {
                position: 5,
                length: 5,
            },
        ],
    },
    {
        // Boikone permites ASCII numberic
        text: '0123456789',
        errorRanges: [],
    },
    {
        // Surrogate pair
        text: 'あいうえお𠀋かきくけこ',
        errorRanges: [
            {
                position: 5,
                length: 2,
            },
        ],
    },
    {
        // Surrogate pair
        text: 'あいうえお😀😃😄かきくけこ',
        errorRanges: [
            {
                position: 5,
                length: 6,
            },
        ],
    },
]

for (const { text, errorRanges } of fixtures) {
    test('testCharacterType detects the invalid characters and return errors when they exist', () => {
        expect(testCharacterType(text)).toMatchObject(errorRanges)
    })
}
