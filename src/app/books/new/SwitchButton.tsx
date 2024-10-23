'use client';

export type State = {
  manual: boolean,
  isbn: boolean,
}

export type Action = {
  type: string;
}

export const ACTIONS = {
  MANUAL: 'manual',
  ISBN: 'isbn',
}

const commonClasses = 'border w-40 py-4 font-sans transition-all'

export function SwitchButton({ reducer }:
  {
    reducer: [
      State,
      ({ type }: { type: string }) => void
    ]
  }) {
  const [state, dispatch] = reducer;
  const manualClasses = [commonClasses, 'rounded-l-lg']
    .concat(state.manual ? 'font-bold active underline' : '').join(' ')
  const isbnClasses = [commonClasses, 'rounded-r-lg']
    .concat(state.isbn ? 'font-bold active underline' : '').join(' ')
  return (
    <div className='flex justify-center mt-4'>
      <button
        onClick={() => dispatch({ type: ACTIONS.MANUAL })}
        className={manualClasses}
      >
        Manual
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.ISBN })}
        className={isbnClasses}
      >
        ISBN
      </button>
    </div>
  )
}