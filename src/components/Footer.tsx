import React from 'react'

export function Footer() {
    return (
        <div className="flex h-full items-center bg-black px-3 text-sm text-gray-400">
            <a href="?mode=classic" className="">
                旧版
            </a>
            <span className="grow" />
            <span>
                wwww.boikone-preview.com created by{' '}
                <a
                    href="https://twitter.com/sniper_voice/"
                    className="hover:underline"
                >
                    @sniper_voice
                </a>
            </span>
        </div>
    )
}
