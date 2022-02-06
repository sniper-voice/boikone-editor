import React, { useMemo } from 'react'
import { ScenarioText } from '../lib/models'
import { aggregateCountByCharacter } from '../lib/aggregateCountByCharacter'

type Props = {
    scenarioText: ScenarioText
}

export function Stats({ scenarioText }: Props) {
    const characterCounts = useMemo(
        () =>
            Object.entries(aggregateCountByCharacter(scenarioText)).sort(
                (lhs, rhs) => rhs[1] - lhs[1]
            ),
        [scenarioText]
    )
    const counts = characterCounts.map(([character, count]) => count)
    const maxCount = Math.max(...counts)
    const totalCount = counts.reduce((acc, count) => acc + count, 0)
    const barColors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-lime-500',
        'bg-cyan-500',
        'bg-purple-500',
        'bg-red-700',
        'bg-orange-700',
        'bg-lime-700',
        'bg-cyan-700',
        'bg-purple-700',
    ]

    return (
        <div className="w-96 rounded-md bg-black/90 p-3 drop-shadow-sm">
            <span className="text-xl">{totalCount}</span>
            <span className="ml-1 text-xs">文字</span>
            <ul>
                {characterCounts.map(([character, count], index) => (
                    <li
                        key={character}
                        title={`${count}文字`}
                        className="flex items-center"
                    >
                        <div className="basis-44">
                            {character === '0' ? 'ト書' : character}
                        </div>
                        <div className="grow">
                            <div
                                className={`h-3 ${
                                    character === '0'
                                        ? 'bg-gray-300'
                                        : barColors.length > 0
                                        ? barColors.shift()
                                        : 'bg-gray-500'
                                }`}
                                style={{
                                    width: `${(100 * count) / maxCount}%`,
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
