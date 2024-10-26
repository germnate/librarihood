'use client';

import { Form } from "../shared/form";
import { IsbnSearch } from "./IsbnSearch";
import { Action, State, SwitchButton, ACTIONS } from './SwitchButton'
import { useReducer, useState } from 'react'
import { ItemSelectorModal, ModalItem } from "../shared/ItemSelectorModal";

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
    const [tagSelectorOpen, setTagSelectorOpen] = useState(false)
    const [tags, setTags] = useState<Array<ModalItem>>([])
    const manualClassNames = ['absolute left-0 right-0 transition-all duration-500'].concat(!state.manual ? '-translate-x-full' : '').join(' ')
    const isbnClassNames = ['transition-all duration-500'].concat(!state.isbn ? 'translate-x-full' : '').join(' ')

    function confirmTags(tagItems: Array<ModalItem>) {
        const filterTags = tagItems.filter(item => item.checked)
        setTags(filterTags)
    }
    return (
        <div className='overflow-x-hidden relative h-full'>
            <ItemSelectorModal isOpen={tagSelectorOpen} setOpen={setTagSelectorOpen} confirmCallback={confirmTags} />
            <SwitchButton reducer={reducer} />
            <div className={manualClassNames}>
                <Form userId={userId} setTagSelectorOpen={setTagSelectorOpen} tags={tags} />
            </div>
            <div className={isbnClassNames}>
                <IsbnSearch userId={userId} />
            </div>
        </div>
    )
}