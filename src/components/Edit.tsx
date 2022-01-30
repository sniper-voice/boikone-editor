import React from 'react'
import { Rnd } from 'react-rnd'

type Props = {
    text: string
    defaultRect: {
        x: number
        y: number
        width: number
        height: number
    }
    onTextChange: (text: string) => void
    onPositionChange: (x: number, y: number) => void
    onSizeChange: (width: number, height: number) => void
}

export function Edit({
    text,
    defaultRect,
    onTextChange,
    onPositionChange,
    onSizeChange,
}: Props) {
    return (
        <Rnd
            default={defaultRect}
            bounds="window"
            onDragStop={(_event, data) => onPositionChange(data.x, data.y)}
            onResize={(_event, _direction, ref) => {
                onSizeChange(ref.offsetWidth, ref.offsetHeight)
            }}
        >
            <textarea
                aria-label="scenario-edit"
                className="h-full w-full"
                value={text}
                onChange={(event) => {
                    onTextChange(event.target.value)
                }}
            ></textarea>
        </Rnd>
    )
}
