'use client';

import { Form } from "../shared/form";
import { IsbnSearch } from "./IsbnSearch";
import { Action, State, SwitchButton, ACTIONS } from './SwitchButton'
import { useState, useReducer } from 'react'

function reduceFunction(state: State, action: Action) {
    switch (action.type) {
        case ACTIONS.MANUAL:
            return { manual: true, isbn: false }
        case ACTIONS.ISBN:
            return { manual: false, isbn: true }
        default:
            return state
    }

}

export default function Container({ userId }: { userId: string | undefined }) {
    const reducer = useReducer(reduceFunction, { manual: true, isbn: false });
    const [state] = reducer;
    const manualClassNames = ['absolute left-0 right-0 transition-all duration-500'].concat(!state.manual ? '-translate-x-full' : '').join(' ')
    const isbnClassNames = ['transition-all duration-500'].concat(!state.isbn ? 'translate-x-full' : '').join(' ')
    return (
        <div className='overflow-hidden'>
            <SwitchButton reducer={reducer} />
            <div className={manualClassNames}>
                <Form userId={userId} />
            </div>
            <div className={isbnClassNames}>
                <IsbnSearch />
            </div>
        </div>
    )
}