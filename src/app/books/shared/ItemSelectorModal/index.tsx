'use client';

import { useEffect, useState } from "react";

export type ModalItem = {
    id: string,
    name: string,
    checked: boolean,
}

export function ItemSelectorModal({
    isOpen,
    setOpen,
    items = [],
    confirmCallback = () => { }
}: {
    isOpen: boolean,
    setOpen: (bool: boolean) => void,
    items: Array<ModalItem>,
    confirmCallback: (items: Array<ModalItem>) => void
}) {
    const [search, setSearch] = useState('')
    const [stateItems, setStateItems] = useState<Array<ModalItem>>([])
    function close(e: React.MouseEvent<HTMLDivElement>) {
        // if clicked element is the element with the handler
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    }

    useEffect(() => {
        setStateItems(items)
    }, [])

    function updateChecked(id: string) {
        const newStateItems = stateItems.map(each => {
            if (each.id === id) {
                return { ...each, checked: !each.checked }
            }
            return each;
        })
        setStateItems(newStateItems)
    }

    function createTag() {
        if (!search?.length || stateItems.find(each => each.name === search)) return;
        const newItem = { id: crypto.randomUUID(), name: search, checked: true }
        setStateItems([...stateItems, newItem])
        setSearch('');
    }

    function onClickConfirm() {
        console.log(stateItems)
        confirmCallback(stateItems)
        setOpen(false)
    }

    function onPressEnter(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            createTag();
        }
    }

    const classNames = ['absolute z-[9] left-0 right-0 top-0 bottom-0 bg-black/50 transition-all duration-300 cursor-pointer']
    if (!isOpen) classNames.push('-translate-y-full')

    return (
        <div onClick={close} className={classNames.join(' ')}>
            <div className='flex flex-col mx-auto mt-12 px-2 py-2 bg-libraryGray sm:w-3/4 max-w-4xl opacity-100 rounded-lg shadow-lg text-gray-300 cursor-auto'>
                <div className='flex justify-between items-center gap-1'>
                    <input className='bg-transparent px-4 mb-2 focus:outline-white-1 rounded-lg grow' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={onPressEnter} />
                    <button onClick={createTag} className='bg-gray-500 px-2 py-1 rounded-full mb-2'>Add Tag</button>
                </div>
                <div className='max-h-[75dvh] overflow-auto'>
                    {stateItems.map((item, index) => {
                        return (
                            <div key={item.id} className={`flex justify-between px-4 py-2 bg-gray${index % 2 ? '-500' : '480'}`} onClick={() => updateChecked(item.id)}>
                                <span>{item.name}</span>
                                <input type='checkbox' name={item.name} checked={item.checked} onChange={() => { }} />
                            </div>
                        )
                    })}
                </div>
                <button onClick={onClickConfirm} className='border border-libraryOrange text-libraryOrange px-2 py-2 mt-2'>Confirm</button>
            </div>
        </div>
    )
}