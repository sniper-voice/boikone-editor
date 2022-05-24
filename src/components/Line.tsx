import React from 'react'
import { Line as LineData } from '../lib/models'

type Props = {
    line: LineData
}

function Container({ children }: { children: React.ReactNode }) {
    return <div className="mb-2 min-h-[60px] w-[375px]">{children}</div>
}

export function Line({ line }: Props) {
    switch (line.type) {
        case 'narrative':
            return (
                <Container>
                    <div className="relative clear-right mx-5 my-2 w-[335px] p-2 text-center text-sm leading-normal text-white">
                        {line.text.str}
                    </div>
                </Container>
            )
        case 'dialogue':
            return (
                <Container>
                    <div className="relative clear-right mx-5 mt-0 mb-2 table rounded bg-white/80 p-2">
                        <div className="mb-[4px] text-xs leading-normal text-violet-900">
                            {line.character.str}
                        </div>
                        <div className="text-sm leading-normal tracking-[.18px] text-slate-900">
                            {line.text.str}
                        </div>
                        <div className="pointer-events-none absolute top-[3px] left-[-8px] ml-[-10px] -rotate-90 border-x-[6px] border-y-[12px] border-transparent border-b-white opacity-80"></div>
                    </div>
                </Container>
            )
        case 'no_colon':
            return <Container>error</Container>
    }

    throw Error('unrecognized line type')
}
