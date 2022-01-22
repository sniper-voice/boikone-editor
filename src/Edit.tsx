import React from 'react'
import Draggable from 'react-draggable'

type Props = {
    text: string
    onChange: (text: string) => void
}

export function Edit({ text, onChange }: Props) {
    return (
        <Draggable>
            <div className="w-96 h-96 absolute left-0 bottom-0">
                <textarea
                    className="w-full h-full"
                    value={text}
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                ></textarea>
            </div>
        </Draggable>
    )
}
