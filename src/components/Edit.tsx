import React, { useRef } from 'react'

type Props = {
    text: string
    onTextChange: (text: string, cursorPosition: number | null) => void
}

export function Edit({ text, onTextChange }: Props) {
    const textareaElement = useRef<HTMLTextAreaElement>(null)

    return (
        <textarea
            ref={textareaElement}
            aria-label="scenario-edit"
            className="h-full w-full pl-1 text-black"
            value={text}
            onChange={(event) => {
                onTextChange(
                    event.target.value,
                    textareaElement.current &&
                        document.activeElement === textareaElement.current &&
                        textareaElement.current.selectionStart ===
                            textareaElement.current.selectionEnd
                        ? textareaElement.current.selectionStart
                        : null
                )
            }}
        ></textarea>
    )
}
