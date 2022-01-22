import React from 'react'
import { PreviewHeader } from './PreviewHeader'
import { PreviewFooter } from './PreviewFooter'

export function Preview() {
    return (
        <div className="w-full h-full bg-slate-50 flex flex-col">
            <PreviewHeader />
            <div className="grow bg-gray-900"></div>
            <PreviewFooter />
        </div>
    )
}
