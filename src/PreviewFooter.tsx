import React from 'react'

export function PreviewFooter() {
    return (
        <div className="h-full bg-black text-sm text-gray-400 pr-3 flex items-center justify-end">
            <span>
                boikone-editor.com created by{' '}
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
