import React from 'react'
import { CountByCharacter } from '../lib/models'

type Props = {
    entries: Readonly<
        {
            readonly character: string
            readonly count: number
            readonly barColor: string
        }[]
    >
}

export function Stats({ entries }: Props) {
    const counts = entries.map(({ count }) => count)
    const maxCount = Math.max(...counts)
    const totalCount = counts.reduce((acc, count) => acc + count, 0)

    return (
        <div className="w-96 rounded-md bg-black/90 p-3 drop-shadow-sm">
            <span className="text-xl">{totalCount}</span>
            <span className="ml-1 text-xs">文字</span>
            <ul>
                {entries.map(({ character, count, barColor }, index) => (
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
                                className={`h-3 ${barColor}`}
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
