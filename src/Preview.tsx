import React from 'react'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'
import { ScenarioText } from './lib/models'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    return (
        <div className="h-full overflow-hidden bg-slate-50 text-zinc-50">
            <div className="h-14">
                <PreviewHeader />
            </div>
            <div className="h-[calc(100%-theme(spacing.14)-theme(spacing.9))] bg-gray-900 flex flex-row-reverse px-6 pt-10">
                {scenarioText
                    .map((words, wordsIndex) =>
                        words.lines.map((line, lineIndex) => (
                            <div
                                key={`${wordsIndex}-${lineIndex}`}
                                className="writing-mode-vertical max-h-[744px] h-auto break-words"
                            >
                                {lineIndex === 0 && words.character !== '0' ? (
                                    <div className="ml-3 leading-tight tracking-wide font-bold">
                                        {words.character}
                                    </div>
                                ) : null}
                                <p className="pt-9 ml-3 min-w-[theme(spacing.5)] leading-tight tracking-wide">
                                    {words.character === '0' ? 'ー' : null}
                                    {line}
                                </p>
                            </div>
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
