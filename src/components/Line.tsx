import React from 'react'

type Props = {
    showCharacterName: boolean
    character: string
    text: string
}

export function Line({ showCharacterName, character, text }: Props) {
    return (
        <div className="h-auto max-h-[744px] break-words writing-mode-vertical">
            {showCharacterName && character !== '0' ? (
                <div className="ml-3 font-bold leading-tight tracking-wide">
                    {character}
                </div>
            ) : null}
            <p className="ml-3 min-w-[theme(spacing.5)] pt-9 leading-tight tracking-wide">
                {character === '0' ? 'ー' : null}
                {text}
            </p>
        </div>
    )
}
