import React, { useState, useEffect } from 'react'
import { Split } from '@geoffcox/react-splitter'
import { Scene, CursorPosition } from '../lib/models'
import { parseText } from '../lib/parseText'
import { countCharacters } from '../lib/countCharacters'
import { aggregateCountByCharacter } from '../lib/aggregateCountByCharacter'
import { Preview } from './Preview'
import { Edit } from './Edit'
import { Tabs } from './Tabs'
import { Header } from './Header'
import { Footer } from './Footer'
import { Stats } from './Stats'
import { WordsDistribution } from './WordsDistribution'

type Props = {
    defaultState: {
        text: string
    }
    onStateChange: (payload: { type: 'text'; value: string }) => void
}

const initialText = `0：薄暗い部屋に青白く光るキーボードとモニター。打鍵音が響き渡る
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
男：うむ。使い勝手に関するフィードバックや不具合報告などがあれば、 @sniper_voice に知らせて欲しいのでスナ`
const initialLines = parseText(initialText)
const initialCharacterCounts = countCharacters(initialLines)

export function App({ defaultState, onStateChange }: Props) {
    const [scenes, setScenes] = useState<[Scene, ...Scene[]]>([
        {
            id: 'scene1',
            title: 'シーン1',
            text: initialText,
            lines: initialLines,
            characterCounts: initialCharacterCounts,
        },
    ])
    const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
        null
    )
    const [currentSceneId, setCurrentSceneId] = useState<string>(scenes[0].id)
    const currentScene =
        scenes.find((scene) => scene.id === currentSceneId) || scenes[0]
    const [showStats, setShowStats] = useState<boolean>(false)
    const characterCounts = scenes.map((scene) => scene.characterCounts).flat()
    const charactersSortedByCount = Object.entries(
        aggregateCountByCharacter(characterCounts)
    ).sort((lhs, rhs) => rhs[1] - lhs[1])
    const barColors = [
        'bg-red-500',
        'bg-yellow-300',
        'bg-cyan-500',
        'bg-purple-500',
        'bg-lime-500',
        'bg-red-700',
        'bg-yellow-700',
        'bg-cyan-700',
        'bg-purple-700',
        'bg-lime-700',
    ]
    const barColorByCharacter = charactersSortedByCount.reduce<
        Record<string, string>
    >((table, [character]) => {
        table[character] =
            character === '0'
                ? 'bg-gray-300'
                : barColors.shift() ?? 'bg-gray-500'
        return table
    }, {})
    const entries = charactersSortedByCount.map(([character, count]) => ({
        character,
        count,
        barColor: barColorByCharacter[character],
    }))

    useEffect(() => {
        const handleDocumentClick = () => {
            if (showStats) {
                setShowStats(false)
            }
        }
        document.addEventListener('click', handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [showStats])

    return (
        <>
            <div className="relative h-screen overflow-hidden bg-slate-50 text-zinc-50">
                <Split initialPrimarySize="40%">
                    <div className="relative h-full">
                        <div
                            className={`absolute right-2 top-16 ${
                                showStats ? 'visible' : 'invisible'
                            }`}
                        >
                            <Stats entries={entries} />
                        </div>
                        <div className="h-14">
                            <Header
                                onStatClick={() => setShowStats(!showStats)}
                            />
                        </div>
                        <div className="h-10">
                            <Tabs
                                tabs={scenes}
                                currentTab={currentSceneId}
                                onTabClick={(id) => {
                                    setCurrentSceneId(id)
                                    setCursorPosition(null)
                                }}
                                onPlusClick={() => {
                                    setScenes([
                                        ...scenes,
                                        {
                                            id: `scene${scenes.length + 1}`,
                                            title: `シーン${scenes.length + 1}`,
                                            text: '',
                                            lines: [],
                                            characterCounts: [],
                                        },
                                    ])
                                }}
                                onMinusClick={() => {
                                    if (scenes.length >= 2) {
                                        setScenes(
                                            scenes.filter(
                                                (scene, index) =>
                                                    index !== scenes.length - 1
                                            ) as [Scene, ...Scene[]]
                                        )
                                    }
                                }}
                            />
                        </div>
                        <div className="h-[calc(100%-theme(spacing.14)-theme(spacing.10)-theme(spacing.12))]">
                            <Edit
                                text={currentScene.text}
                                onTextChange={(text, cursorPosition) => {
                                    const lines = parseText(text)
                                    const characterCounts =
                                        countCharacters(lines)

                                    setScenes(
                                        // The result of the map should have one element
                                        scenes.map((scene) =>
                                            scene.id === currentSceneId
                                                ? {
                                                      ...scene,
                                                      text,
                                                      lines,
                                                      characterCounts,
                                                  }
                                                : scene
                                        ) as [Scene, ...Scene[]]
                                    )
                                    setCursorPosition(
                                        cursorPosition
                                            ? {
                                                  position: cursorPosition,
                                                  sceneId: currentSceneId,
                                              }
                                            : null
                                    )
                                    onStateChange({
                                        type: 'text',
                                        value: text,
                                    })
                                }}
                            />
                        </div>
                        <div className="h-12">
                            <Footer />
                        </div>
                    </div>
                    <Preview scenes={scenes} cursorPosition={cursorPosition} />
                </Split>
            </div>
        </>
    )
}
