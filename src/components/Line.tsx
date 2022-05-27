import React from 'react'
import { Line as LineData, ErrorRange } from '../lib/models'

type Props = {
    line: LineData
    cursorPosition: number | null
}

function Container({ children }: { children: React.ReactNode }) {
    return <div className="mb-2 min-h-[60px] w-[375px]">{children}</div>
}

function markupTextWithTypeError({
    str,
    characterTypeErrors,
}: {
    readonly str: string
    readonly characterTypeErrors: Readonly<ErrorRange[]>
}) {
    const result = []
    let lastPosition = 0

    for (const error of characterTypeErrors) {
        result.push(
            <span key={`lastPosition-valid`}>
                {str.substring(lastPosition, error.position)}
            </span>
        )
        result.push(
            <span
                key={`lastPosition-invalid`}
                className="text-red-500"
                title="ボイコネではこの文字は使えません"
            >
                {str.substr(error.position, error.length)}
            </span>
        )
        lastPosition = error.position + error.length
    }

    result.push(<span key="last">{str.substr(lastPosition)}</span>)

    return result
}

function markupTextWithTypeAndCountOverError({
    str,
    characterTypeErrors,
    countOverErrors,
}: {
    readonly str: string
    readonly characterTypeErrors: Readonly<ErrorRange[]>
    readonly countOverErrors: Readonly<ErrorRange[]>
}) {
    const result = []
    let lastPosition = 0

    for (const error of characterTypeErrors) {
        if (
            countOverErrors.length > 0 &&
            countOverErrors[0].position <= lastPosition
        ) {
            break
        }

        result.push(
            <span key={`${lastPosition}-valid`}>
                {str.substring(lastPosition, error.position)}
            </span>
        )
        result.push(
            <span
                key={`${lastPosition}-invalid`}
                className="text-red-500"
                title="この文字は使えません"
            >
                {str.substr(error.position, error.length)}
            </span>
        )
        lastPosition = error.position + error.length
    }

    if (countOverErrors.length > 0) {
        result.push(
            <span key="last-valid">
                {str.substring(lastPosition, countOverErrors[0].position)}
            </span>
        )
        result.push(
            <span
                key="last-invalid"
                className="text-red-500"
                title="100文字を越えています"
            >
                {str.substr(
                    Math.max(lastPosition, countOverErrors[0].position)
                )}
            </span>
        )
    } else {
        result.push(<span key="last-valid">{str.substr(lastPosition)}</span>)
    }

    return result
}

export function Line({ line, cursorPosition }: Props) {
    switch (line.type) {
        case 'narrative':
            return (
                <Container>
                    <div className="relative clear-right mx-5 my-2 w-[335px] p-2 text-center text-sm leading-normal text-white">
                        {markupTextWithTypeAndCountOverError(line.text)}
                    </div>
                </Container>
            )
        case 'dialogue':
            return (
                <Container>
                    <div className="relative clear-right mx-5 mt-0 mb-2 table rounded bg-white/80 p-2">
                        <div className="mb-[4px] text-xs leading-normal text-violet-900">
                            {markupTextWithTypeError(line.character)}
                        </div>
                        <div className="text-sm leading-normal tracking-[.18px] text-slate-900">
                            {markupTextWithTypeAndCountOverError(line.text)}
                        </div>
                        <div className="pointer-events-none absolute top-[3px] left-[-8px] ml-[-10px] -rotate-90 border-x-[6px] border-y-[12px] border-transparent border-b-white opacity-80"></div>
                    </div>
                </Container>
            )
        case 'no_colon':
            return (
                <Container>
                    {cursorPosition &&
                    line.position <= cursorPosition &&
                    cursorPosition <= line.position + line.text.str.length ? (
                        <div className="relative clear-right mx-5 my-2 w-[335px] p-2 text-center text-sm leading-normal text-white">
                            {markupTextWithTypeError(line.text)}
                        </div>
                    ) : (
                        <div className="relative clear-right mx-5 my-2 w-[335px] bg-red-500/50 p-2 text-center text-sm leading-normal text-white">
                            {markupTextWithTypeError(line.text)}
                            <div className="text-[11px] text-red-300">
                                要全角コロン
                            </div>
                        </div>
                    )}
                </Container>
            )
    }

    throw Error('unrecognized line type')
}
