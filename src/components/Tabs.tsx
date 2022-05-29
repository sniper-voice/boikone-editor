import React from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'

type Props = {
    tabs: { id: string; title: string }[]
    currentTab: string
    onTabClick: (id: string) => void
    onPlusClick: () => void
    onMinusClick: () => void
}

export function Tabs({
    tabs,
    currentTab,
    onTabClick,
    onPlusClick,
    onMinusClick,
}: Props) {
    return (
        <div className="flex h-full items-center gap-3 pr-3">
            <div className="flex flex-nowrap overflow-x-auto">
                {tabs.map(({ id, title }) =>
                    id === currentTab ? (
                        <button
                            key={id}
                            className="relative block whitespace-nowrap p-3 text-sm font-semibold text-slate-900"
                            onClick={() => onTabClick(id)}
                        >
                            {title}
                            <div className="absolute left-0 bottom-0 h-0.5 w-full bg-fuchsia-500" />
                        </button>
                    ) : (
                        <button
                            key={id}
                            className="block whitespace-nowrap p-3 text-sm text-slate-900 opacity-70"
                            onClick={() => onTabClick(id)}
                        >
                            {title}
                        </button>
                    )
                )}
            </div>
            <button onClick={() => onPlusClick()}>
                <PlusIcon className="h-3.5 w-3.5 text-slate-900" />
            </button>
            <button onClick={() => onMinusClick()} disabled={tabs.length === 1}>
                <MinusIcon
                    className={`h-3.5 w-3.5 text-slate-900 ${
                        tabs.length === 1 ? 'opacity-70' : ''
                    }`}
                />
            </button>
        </div>
    )
}
