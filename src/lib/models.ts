import type { ReadonlyDeep } from 'type-fest'

export type ErrorRange = {
    readonly position: number // The starting point of error range in code unit
    readonly length: number // The length of error range in code unit
}

export type DialogueLine = ReadonlyDeep<{
    type: 'dialogue'
    character: {
        str: string
        characterTypeErrors: ErrorRange[]
    }
    text: {
        str: string
        countOverErrors: ErrorRange[]
        characterTypeErrors: ErrorRange[]
    }
}>

export type NarrativeLine = ReadonlyDeep<{
    type: 'narrative'
    text: {
        str: string
        countOverErrors: ErrorRange[]
        characterTypeErrors: ErrorRange[]
    }
}>

export type NoColonLine = ReadonlyDeep<{
    type: 'no_colon'
    text: {
        str: string
        noColonErrors: ErrorRange[]
        characterTypeErrors: ErrorRange[]
    }
}>

export type Line = NarrativeLine | DialogueLine | NoColonLine

export type ScenarioText = Readonly<Line[]>

export type CharacterCount = {
    readonly character: string // 0 means `narrative`
    readonly count: number
}

export type CharacterCounts = Readonly<CharacterCount[]>

export type CountByCharacter = Record<string, number>
