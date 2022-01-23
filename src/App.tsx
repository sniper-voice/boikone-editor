import React, { useState, useMemo } from 'react'
import { Preview } from './Preview'
import { Edit } from './Edit'
import { parseText } from './lib/parseText'

export function App() {
    const [text, setText] = useState<string>('')
    const scenarioText = useMemo(() => parseText(text), [text])
    return (
        <>
            <div className="h-screen">
                <Preview scenarioText={scenarioText} />
            </div>
            <Edit text={text} onChange={setText} />
        </>
    )
}
