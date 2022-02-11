import React from 'react'

type Props = {
    text: string
    onTextChange: (text: string) => void
}

export function Edit({ text, onTextChange }: Props) {
    return (
        <textarea
            aria-label="scenario-edit"
            className="h-full w-full pl-1 text-black"
            value={text}
            onChange={(event) => {
                onTextChange(event.target.value)
            }}
        ></textarea>
    )
}
