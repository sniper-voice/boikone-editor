export type Words = {
    readonly character: string
    readonly lines: Readonly<[string, ...string[]]>
}

export type CharacterCount = {
    readonly character: string
    readonly count: number
}

export type ScenarioText = Readonly<Words[]>

export type CharacterCounts = Readonly<CharacterCount[]>

export type CountByCharacter = Record<string, number>
