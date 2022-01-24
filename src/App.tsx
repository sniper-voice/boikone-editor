import React, { useState, useMemo } from 'react'
import { Preview } from './Preview'
import { Edit } from './Edit'
import { parseText } from './lib/parseText'

const initialText = `0：部屋に入り、鍵をしめるふたり
亜蘭：「（息が荒い）はあ、はあ、はあ、鍵をかけた。これで、時間が稼げる」
コウスケ：「（息が荒い）良かった。......来たよ！」
ひろし：「うぐ、うぐぐぐぐ、あけろ～、おおおおっ、ここを開けろおおおおおっ！！」
亜蘭：「あの野郎。扉に体当たりしてきてやがる」
コウスケ：「どうしよう。この扉、古いから鍵かけてても、あまり持たないよ。きっと力業で開けられてしまう」
亜蘭：「どうするんだよ！　わああ、もう扉がたわんでるじゃんか！　どうしてこんなことになってるんだよおお！」
コウスケ：「亜蘭、黙って。今、何か見えそうなんだ......」
亜蘭：「見えるって、霊が見えるのか？　でも、お前、祓えないって」
コウスケ：
コウスケ：「うん。でも......なにか見える。これ、あの少女の見た景色だ」
亜蘭：「コウスケ、顔色悪いぞ。まさか、お前まで憑りつかれてないよな」
ひろし：「ぐおおおお、開けろ！　壊して開けてやる！　もうすぐ噛みついて、喉元引きちぎってやるぞ、おおおお！！」
コウスケ：「ひろしみたいに憑りつかれた状態にボクが見える？　ボクは大丈夫だよ。
コウスケ：ちゃんとボクのままだ。それよりも、今あるものが見えた。これ、きっと少女の最期に見た記憶だ」
`

export function App() {
    const [text, setText] = useState<string>(initialText)
    const scenarioText = useMemo(() => parseText(text), [text])
    return (
        <>
            <div className="h-screen overflow-hidden">
                <Preview scenarioText={scenarioText} />
            </div>
            <Edit text={text} onChange={setText} />
        </>
    )
}
