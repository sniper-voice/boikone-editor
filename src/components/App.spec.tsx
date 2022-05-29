import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { App } from './App'

test('It renders text when the value of textarea is changed', () => {
    const app = render(
        <App
            defaultState={{
                scenes: [
                    {
                        sceneId: 'scene1',
                        title: 'シーン1',
                        text: '',
                    },
                ],
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
