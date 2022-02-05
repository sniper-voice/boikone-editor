import React, { useState, useRef } from 'react'
import { ScenarioText } from '../lib/models'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'
import { Stats } from './Stats'
import { Line } from './Line'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    const [showStats, setShowStats] = useState<boolean>(false)
    const scrollableRef = useRef<HTMLDivElement>(null)

    return (
        <div className="relative h-full overflow-hidden bg-slate-50 text-zinc-50">
            <div
                className={`absolute right-2 top-16 ${
                    showStats ? 'visible' : 'invisible'
                }`}
            >
                <Stats scenarioText={scenarioText} />
            </div>
            <div className="h-14">
                <PreviewHeader onStatClick={() => setShowStats(!showStats)} />
            </div>
            <div
                data-testid="preview-text"
                className="flex h-[calc(100%-theme(spacing.14)-theme(spacing.12))] flex-row-reverse overflow-x-auto overflow-y-hidden bg-gray-900 px-6 pt-10"
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
            <div className="h-12">
                <PreviewFooter />
            </div>
        </div>
    )
}
