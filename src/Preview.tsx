import React from 'react'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'

type Props = {
    text: string
}

export function Preview({ text }: Props) {
    return (
        <div className="w-full h-full bg-slate-50 flex flex-col text-zinc-50">
            <PreviewHeader />
            <div className="grow bg-gray-900">{text}</div>
            <PreviewFooter />
        </div>
    )
}
