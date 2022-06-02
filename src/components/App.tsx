import React, { useState, useEffect, useMemo } from 'react'
import { Split } from '@geoffcox/react-splitter'
import { Scene, CursorPosition, SavedScene } from '../lib/models'
import { parseText } from '../lib/parseText'
import { countCharacters } from '../lib/countCharacters'
import { aggregateCountByCharacter } from '../lib/aggregateCountByCharacter'
import { Preview } from './Preview'
import { Edit } from './Edit'
import { Tabs } from './Tabs'
import { Header } from './Header'
import { Footer } from './Footer'
import { Stats } from './Stats'
//import { WordsDistribution } from './WordsDistribution'

export type StateChanges =
    | {
          type: 'updateScene'
          payload: {
              sceneId: string
              title: string
              text: string
          }
      }
    | {
          type: 'deleteScene'
          payload: {
              sceneId: string
          }
      }

type Props = {
    defaultState: {
        scenes: [SavedScene, ...SavedScene[]]
    }
    onStateChange: (change: StateChanges) => void
}

function buildScene(savedScene: SavedScene): Scene {
    const lines = parseText(savedScene.text)
    const characterCounts = countCharacters(lines)
    return {
        id: savedScene.sceneId,
        title: savedScene.title,
        text: savedScene.text,
        lines,
        characterCounts,
    }
}

export function App({ defaultState, onStateChange }: Props) {
    const initialScenes = useMemo(
        () => defaultState.scenes.map(buildScene) as [Scene, ...Scene[]],
        [defaultState.scenes]
    )
    const [scenes, setScenes] = useState<[Scene, ...Scene[]]>(initialScenes)
    const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
        null
    )
    const [currentSceneId, setCurrentSceneId] = useState<string>(scenes[0].id)
    const currentScene =
        scenes.find((scene) => scene.id === currentSceneId) || scenes[0]
    const [showStats, setShowStats] = useState<boolean>(false)
    // TODO: aggregateCountByCharacter should be moved to the `Stats` component
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
                            className={`absolute right-2 top-16 z-10 ${
                                showStats ? 'visible' : 'invisible'
                            }`}
                        >
                            <Stats
                                totalCount={scenes.reduce(
                                    (count, scene) =>
                                        (count += scene.text.replaceAll(
                                            '\n',
                                            ''
                                        ).length),
                                    0
                                )}
                                entries={entries}
                            />
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
                                    const newScene = {
                                        id: `scene${scenes.length + 1}`,
                                        title: `シーン${scenes.length + 1}`,
                                        text: '',
                                        lines: [],
                                        characterCounts: [],
                                    }
                                    setScenes([...scenes, newScene])
                                    onStateChange({
                                        type: 'updateScene',
                                        payload: {
                                            sceneId: newScene.id,
                                            title: newScene.title,
                                            text: newScene.text,
                                        },
                                    })
                                }}
                                onMinusClick={() => {
                                    if (scenes.length <= 1) {
                                        return
                                    }

                                    const lastScene = scenes[scenes.length - 1]
                                    if (
                                        lastScene.text.length === 0 ||
                                        window.confirm(
                                            `${currentScene.title}を削除していいですか?`
                                        )
                                    ) {
                                        setScenes(
                                            scenes.filter(
                                                (scene) =>
                                                    scene.id !== lastScene.id
                                            ) as [Scene, ...Scene[]]
                                        )
                                        if (currentSceneId === lastScene.id) {
                                            setCurrentSceneId(
                                                scenes[scenes.length - 2].id
                                            )
                                            setCursorPosition(null)
                                        }

                                        onStateChange({
                                            type: 'deleteScene',
                                            payload: {
                                                sceneId: lastScene.id,
                                            },
                                        })
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
                                        type: 'updateScene',
                                        payload: {
                                            sceneId: currentSceneId,
                                            title: currentScene.title,
                                            text,
                                        },
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
