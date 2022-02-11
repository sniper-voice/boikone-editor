import React, { useRef } from 'react'
import { ScenarioText } from '../lib/models'
import { Line } from './Line'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    const scrollableRef = useRef<HTMLDivElement>(null)

    return (
        <div
            data-testid="preview-text"
            className="flex h-full flex-row-reverse overflow-x-auto overflow-y-hidden bg-gray-900 px-6 pt-10"
            onWheel={(event) => {
                if (!scrollableRef.current) {
                    return
                }

                scrollableRef.current.scrollTo(
                    scrollableRef.current.scrollLeft - event.deltaY * 0.5,
                    scrollableRef.current.scrollTop
                )
            }}
            ref={scrollableRef}
        >
            {scenarioText
                .map((words, wordsIndex) =>
                    words.lines.map((line, lineIndex) => (
                        <Line
                            key={`${wordsIndex}-${lineIndex}`}
                            showCharacterName={lineIndex === 0}
                            character={words.character}
                            text={line}
                        />
                    ))
                )
                .flat()}
        </div>
    )
}
