import React from 'react'
import Draggable from 'react-draggable'

type Props = {
    text: string
    onChange: (text: string) => void
}

export function Edit({ text, onChange }: Props) {
    return (
        <Draggable>
            <div className="absolute left-0 bottom-0 h-96 w-96">
                <textarea
                    aria-label="scenario-edit"
                    className="h-full w-full"
                    value={text}
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                ></textarea>
            </div>
        </Draggable>
    )
}
