import React from 'react'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'
import { ScenarioText } from './lib/models'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    return (
        <div className="w-full h-full bg-slate-50 flex flex-col text-zinc-50">
            <PreviewHeader />
            <div className="grow bg-gray-900">
                {scenarioText
                    .map((words, wordsIndex) =>
                        words.lines.map((line, lineIndex) => (
                            <div key={`${wordsIndex}-${lineIndex}`}>
                                {lineIndex === 0 && words.character !== '0' ? (
                                    <div>{words.character}</div>
                                ) : null}
                                <p>{line}</p>
                            </div>
                        ))
                    )
                    .flat()}
            </div>
            <PreviewFooter />
        </div>
    )
}
