import React, { useRef } from 'react'
import { ScenarioText } from '../lib/models'
import { Line } from './Line'

type Props = {
    scenarioText: ScenarioText
}

export function Preview({ scenarioText }: Props) {
    return (
        <div className="flex h-full items-center justify-center bg-slate-900">
            <div
                data-testid="preview-text"
                className="flex h-[794px] w-[394px] items-center justify-center rounded-[50px] border-3 border-zinc-50 bg-slate-900"
            >
                <div className="relative h-[666px] w-[375px] bg-[url('./images/boikone-preview-bg.jpg')] bg-[length:100%_auto] bg-no-repeat">
                    <div className="pointer-events-none absolute h-[666px] w-[375px] bg-slate-900/50"></div>
                    <div className="absolute h-full w-[375px] overflow-y-auto overflow-x-hidden pt-6">
                        {scenarioText.map((line, lineIndex) => (
                            <Line key={lineIndex} line={line} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
