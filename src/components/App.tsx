import React, { useState, useMemo } from 'react'
import { parseText } from '../lib/parseText'
import { Preview } from './Preview'
import { Edit } from './Edit'

type Props = {
    initialText: string
    onTextChange: (text: string) => void
}

export function App({ initialText, onTextChange }: Props) {
    const [text, setText] = useState<string>(initialText)
    const scenarioText = useMemo(() => {
        onTextChange(text)
        return parseText(text)
    }, [text])

    return (
        <>
            <div className="h-screen overflow-hidden">
                <Preview scenarioText={scenarioText} />
            </div>
            <Edit text={text} onChange={setText} />
        </>
    )
}
