import React from 'react'
import ReactDOM from 'react-dom'
import { entries, set, del, clear } from 'idb-keyval'
import { App, StateChanges } from './components/App'
import { SavedScene } from './lib/models'

const initialScene = {
    sceneId: 'scene1',
    title: 'シーン1',
    text: `0：薄暗い部屋に青白く光るキーボードとモニター。打鍵音が響き渡る
男：ふっふっふ、ついに完成したのでスナ、名付けて「ボイコネプレビュー」
助手：ボ、ボイコネプレビュー？これはいったいなんなのですか？
助手：　
0：モニターを向いたまま話し続ける男
男：きみもシナリオライターのはしくれなら知っているでしょう。ボイコネでシナリオを投稿するときには、まず台本を書いたテキストファイルを作成し、そしてボイコネサイトからファイルを選択する。そうでスナ？
助手：はい
男：では、書き上がったシナリオの実際の見た目確認するときには？
助手：ファイルを選択後にプレビューボタンを押します・・・
男：ふむ。しかし人間とは往々にして過ちを犯すもの。きみはプレビューでキャラクター名の不備や、改行不足など修正すべき点を見つけるでしょう。さて、どうしまスナ？
助手：ローカルのテキストファイルを修正・保存して・・・再度選択・・・です・・・
助手：　
0：興奮した様子で助手に振り向き、男が立ち上がる
男：そう！そのとおり！
男：現状のボイコネ仕様ではこの修正・確認の反復作業が極めてめんどくさい！演者の読みやすいシナリオを作るためには、実際に近い環境でどのように表示されるか確認しながらの調整は、きわめて重要！
助手：たしかに・・・
男：そこでこのボイコネプレビューの登場です。これを使えば、１文字修正するごとに即座にプレビューに反映されまスナ
助手：作業効率爆上がり・・・(ゴクリ
助手：す、すごいじゃないですか！
男：ただし注意点もある。テキストは、あくまでブラウザ内にローカル保存されまスナ。他のＰＣに移すときなどはエディタからコピペしてファイル保存などしていただきたい
助手：クラウドに自動保存されたりとかはないんですか？
男：現状はありません。あくまでシナリオテキストをプレビューするだけのシンプルなものでスナ
助手：よくわかりました。さっそくこれを使ってシナリオを書いてみたいと思います
男：うむ。使い勝手に関するフィードバックや不具合報告などがあれば、 @sniper_voice に知らせて欲しいのでスナ`,
}

async function setScene(scene: SavedScene): Promise<void> {
    const { sceneId, ...remainingParams } = scene
    await set(sceneId, remainingParams)
}

export async function main() {
    const onStateChange = (change: StateChanges) => {
        switch (change.type) {
            case 'updateScene':
                set(change.payload.sceneId, {
                    title: change.payload.title,
                    text: change.payload.text,
                })
                break
            case 'deleteScene':
                del(change.payload.sceneId)
                break
        }
    }

    const restoredScenes = (await entries())
        .filter(([key]) => /^scene\d+$/.test(key.toString()))
        .map(([key, value]) => ({
            sceneId: key.toString(),
            title: value.title,
            text: value.text,
        }))
        .filter(
            (element): element is SavedScene =>
                typeof element.sceneId === 'string' &&
                typeof element.title === 'string' &&
                typeof element.text === 'string'
        )

    if (restoredScenes.length === 0) {
        restoredScenes.push(initialScene)
        await setScene(initialScene)
    }

    const defaultState = {
        scenes: restoredScenes as [SavedScene, ...SavedScene[]],
    }

    ReactDOM.render(
        <React.StrictMode>
            <App defaultState={defaultState} onStateChange={onStateChange} />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

declare global {
    var resetBoikonePreview: () => void
}
window.resetBoikonePreview = async () => {
    await clear()
    await setScene(initialScene)
    window.location.reload()
}
