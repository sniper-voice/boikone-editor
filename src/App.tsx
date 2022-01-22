import React from 'react'
import { Preview } from './Preview'
import { Edit } from './Edit'

export function App() {
    return (
        <>
            <div className="h-screen">
                <Preview />
            </div>
            <Edit />
        </>
    )
}
