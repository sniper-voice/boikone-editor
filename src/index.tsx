import React from 'react'
import ReactDOM from 'react-dom'
import { getMany, set } from 'idb-keyval'
import './index.css'
import { App } from './components/App'

const initialText = `0：薄暗い部屋に青白く光るキーボードとモニターに打鍵音が響き渡る
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
男：うむ。使い勝手に関するフィードバックや不具合報告などがあれば、 @sniper_voice に報告して欲しいのでスナ`

getMany(['text', 'position', 'size']).then(
    ([persistedText, persistedPosition, persistedSize]) => {
        const defaultState = {
            text: persistedText ?? initialText,
            position: persistedPosition ?? {
                x: 50,
                y: 100,
            },
            size: persistedSize ?? {
                width: 500,
                height: 500,
            },
        }

        const onStateChange = (
            payload:
                | {
                      type: 'text'
                      value: string
                  }
                | {
                      type: 'position'
                      value: {
                          x: number
                          y: number
                      }
                  }
                | {
                      type: 'size'
                      value: {
                          width: number
                          height: number
                      }
                  }
        ) => {
            set(payload.type, payload.value)
        }

        ReactDOM.render(
            <React.StrictMode>
                <App
                    defaultState={defaultState}
                    onStateChange={onStateChange}
                />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
)
