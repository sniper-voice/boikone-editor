import React from 'react'
import { CharacterCounts } from '../lib/models'

type Props = {
    characterCounts: CharacterCounts
    barColorByCharacter: Record<string, string>
}

export function WordsDistribution({
    characterCounts,
    barColorByCharacter,
}: Props) {
    return (
        <div className="flex h-full flex-row-reverse">
            {characterCounts.map(({ character, count }, index) => (
                <div
                    key={index}
                    title={character === null ? 'ト書' : character}
                    className={`h-2 ${
                        character === null
                            ? 'bg-gray-300'
                            : barColorByCharacter[character]
                    }`}
                    style={{ flexGrow: count }}
                ></div>
            ))}
        </div>
    )
}
