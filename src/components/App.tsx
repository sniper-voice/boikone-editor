import React, { useState, useEffect, useMemo } from 'react'
import { parseText } from '../lib/parseText'
import { countCharacters } from '../lib/countCharacters'
import { aggregateCountByCharacter } from '../lib/aggregateCountByCharacter'
import { Preview } from './Preview'
import { Edit } from './Edit'
import { Header } from './Header'
import { Footer } from './Footer'
import { Stats } from './Stats'
import { WordsDistribution } from './WordsDistribution'

type Props = {
    defaultState: {
        text: string
        position: {
            x: number
            y: number
        }
        size: {
            width: number
            height: number
        }
    }
    onStateChange: (
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
    ) => void
}

export function App({ defaultState, onStateChange }: Props) {
    const [text, setText] = useState<string>(defaultState.text)
    const scenarioText = useMemo(() => parseText(text), [text])
    const [showStats, setShowStats] = useState<boolean>(false)
    const characterCounts = useMemo(
        () => countCharacters(scenarioText),
        [scenarioText]
    )
    const charactersSortedByCount = useMemo(
        () =>
            Object.entries(aggregateCountByCharacter(characterCounts)).sort(
                (lhs, rhs) => rhs[1] - lhs[1]
            ),
        [characterCounts]
    )
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
            <div className="h-screen overflow-hidden">
                <div className="relative h-full overflow-hidden bg-slate-50 text-zinc-50">
                    <div
                        className={`absolute right-2 top-16 ${
                            showStats ? 'visible' : 'invisible'
                        }`}
                    >
                        <Stats entries={entries} />
                    </div>
                    <div className="h-14">
                        <Header onStatClick={() => setShowStats(!showStats)} />
                    </div>
                    <div className="h-2">
                        <WordsDistribution
                            characterCounts={characterCounts}
                            barColorByCharacter={barColorByCharacter}
                        />
                    </div>
                    <div className="h-[calc(100%-theme(spacing.14)-theme(spacing.2)-theme(spacing.12))]">
                        <Preview scenarioText={scenarioText} />
                    </div>
                    <div className="h-12">
                        <Footer />
                    </div>
                </div>
            </div>
            <Edit
                defaultRect={{
                    ...defaultState.position,
                    ...defaultState.size,
                }}
                text={text}
                onTextChange={(text) => {
                    setText(text)
                    onStateChange({
                        type: 'text',
                        value: text,
                    })
                }}
                onPositionChange={(x, y) =>
                    onStateChange({
                        type: 'position',
                        value: { x, y },
                    })
                }
                onSizeChange={(width, height) =>
                    onStateChange({
                        type: 'size',
                        value: { width, height },
                    })
                }
            />
        </>
    )
}
