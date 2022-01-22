import React, { useState } from 'react'
import { Preview } from './Preview'
import { Edit } from './Edit'

export function App() {
    const [text, setText] = useState<string>('')
    return (
        <>
            <div className="h-screen">
                <Preview text={text} />
            </div>
            <Edit text={text} onChange={setText} />
        </>
    )
}
