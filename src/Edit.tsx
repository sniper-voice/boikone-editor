import React from 'react'
import Draggable from 'react-draggable'

export function Edit() {
    return (
        <Draggable>
            <div className="w-96 h-96 absolute left-0 bottom-0">
                <textarea className="w-full h-full"></textarea>
            </div>
        </Draggable>
    )
}
