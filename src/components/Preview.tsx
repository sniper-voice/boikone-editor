import React, { useState, useEffect, useRef, useMemo } from 'react'
import { ScenarioText } from '../lib/models'
import { countCharacters } from '../lib/countCharacters'
import { aggregateCountByCharacter } from '../lib/aggregateCountByCharacter'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'
import { Stats } from './Stats'
import { Line } from './Line'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    const [showStats, setShowStats] = useState<boolean>(false)
    const scrollableRef = useRef<HTMLDivElement>(null)
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
        <div className="relative h-full overflow-hidden bg-slate-50 text-zinc-50">
            <div
                className={`absolute right-2 top-16 ${
                    showStats ? 'visible' : 'invisible'
                }`}
            >
                <Stats entries={entries} />
            </div>
            <div className="h-14">
                <PreviewHeader onStatClick={() => setShowStats(!showStats)} />
                <div className="flex flex-row-reverse">
                    {characterCounts.map(({ character, count }, index) => (
                        <div
                            key={index}
                            title={character === '0' ? 'ト書' : character}
                            className={`h-2 ${barColorByCharacter[character]}`}
                            style={{ flexGrow: count }}
                        ></div>
                    ))}
                </div>
            </div>
            <div
                data-testid="preview-text"
                className="flex h-[calc(100%-theme(spacing.14)-theme(spacing.12))] flex-row-reverse overflow-x-auto overflow-y-hidden bg-gray-900 px-6 pt-10"
                onWheel={(event) => {
                    if (!scrollableRef.current) {
                        return
                    }

                    scrollableRef.current.scrollTo(
                        scrollableRef.current.scrollLeft - event.deltaY * 0.5,
                        scrollableRef.current.scrollTop
                    )
                }}
                ref={scrollableRef}
            >
                {scenarioText
                    .map((words, wordsIndex) =>
                        words.lines.map((line, lineIndex) => (
                            <Line
                                key={`${wordsIndex}-${lineIndex}`}
                                showCharacterName={lineIndex === 0}
                                character={words.character}
                                text={line}
                            />
                        ))
                    )
                    .flat()}
            </div>
            <div className="h-12">
                <PreviewFooter />
            </div>
        </div>
    )
}
