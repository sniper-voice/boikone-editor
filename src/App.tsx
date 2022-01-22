import React from 'react'
import { Preview } from './Preview'
import { Edit } from './Edit'

export function App() {
    return (
        <>
            <div className="w-full h-[calc(100vh-theme(space.96))]">
                <Preview />
            </div>
            <div className="w-96 h-96 mx-auto">
                <Edit />
            </div>
        </>
    )
}
