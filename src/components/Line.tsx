import React from 'react'

type Props = {
    character: string
    text: string
}

export function Line({ character, text }: Props) {
    return (
        <div className="mb-2 min-h-[60px] w-[375px]">
            {character !== '0' ? (
                <div className="relative clear-right mx-5 mt-0 mb-2 table rounded bg-white/80 p-2">
                    <div className="mb-[4px] text-xs leading-normal text-violet-900">
                        {character}
                    </div>
                    <div className="text-sm leading-normal tracking-[.18px] text-slate-900">
                        {text}
                    </div>
                    <div className="pointer-events-none absolute top-[3px] left-[-8px] ml-[-10px] -rotate-90 border-x-[6px] border-y-[12px] border-transparent border-b-white opacity-80"></div>
                </div>
            ) : (
                <div className="relative clear-right mx-5 my-2 w-[335px] p-2 text-center text-sm leading-normal text-white">
                    {text}
                </div>
            )}
        </div>
    )
}
