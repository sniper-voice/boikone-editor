import React from 'react'
import { Rnd } from 'react-rnd'

type Props = {
    text: string
    onChange: (text: string) => void
}

export function Edit({ text, onChange }: Props) {
    return (
        <Rnd
            default={{
                x: 50,
                y: 100,
                width: 500,
                height: 500,
            }}
            bounds="window"
        >
            <textarea
                aria-label="scenario-edit"
                className="h-full w-full"
                value={text}
                onChange={(event) => {
                    onChange(event.target.value)
                }}
            ></textarea>
        </Rnd>
    )
}
