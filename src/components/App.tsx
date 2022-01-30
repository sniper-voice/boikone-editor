import React, { useState, useMemo } from 'react'
import { parseText } from '../lib/parseText'
import { Preview } from './Preview'
import { Edit } from './Edit'

type Props = {
    defaultState: {
        text: string
        position: {
            x: number
            y: number
        }
        size: {
            width: number
            height: number
        }
    }
    onStateChange: (
        payload:
            | {
                  type: 'text'
                  value: string
              }
            | {
                  type: 'position'
                  value: {
                      x: number
                      y: number
                  }
              }
            | {
                  type: 'size'
                  value: {
                      width: number
                      height: number
                  }
              }
    ) => void
}

export function App({ defaultState, onStateChange }: Props) {
    const [text, setText] = useState<string>(defaultState.text)
    const scenarioText = useMemo(() => parseText(text), [text])

    return (
        <>
            <div className="h-screen overflow-hidden">
                <Preview scenarioText={scenarioText} />
            </div>
            <Edit
                defaultRect={{
                    ...defaultState.position,
                    ...defaultState.size,
                }}
                text={text}
                onTextChange={(text) => {
                    setText(text)
                    onStateChange({
                        type: 'text',
                        value: text,
                    })
                }}
                onPositionChange={(x, y) =>
                    onStateChange({
                        type: 'position',
                        value: { x, y },
                    })
                }
                onSizeChange={(width, height) =>
                    onStateChange({
                        type: 'size',
                        value: { width, height },
                    })
                }
            />
        </>
    )
}
