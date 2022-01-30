import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { App } from './App'

test('It renders text when the value of textarea is changed', () => {
    const app = render(
        <App
            defaultState={{
                text: '',
                position: { x: 0, y: 0 },
                size: { width: 100, height: 100 },
            }}
            onStateChange={() => {}}
        />
    )
    const input = app.getByLabelText('scenario-edit')
    fireEvent.change(input, {
        target: { value: 'スナイパー：スナイパーの朝は早いでスナ' },
    })
    expect(app.getByTestId('preview-text')).toHaveTextContent(
        'スナイパースナイパーの朝は早いでスナ'
    )
})
