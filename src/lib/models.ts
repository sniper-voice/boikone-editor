export type Words = {
    readonly character: string
    readonly lines: Readonly<[string, ...string[]]>
}

export type ScenarioText = Readonly<Words[]>

export type CountByCharacter = Record<string, number>
