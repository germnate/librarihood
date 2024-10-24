import { BooksRecord } from "../../../../pocketbase-types"
import { Tag } from './Tag'

export function Tags({ book }: { book: BooksRecord }) {
    return (
        <div className='flex flex-wrap gap-2'>
            {book?.tags?.map?.((tag: string) => {
                return <Tag key={tag} tag={tag} />
            })}
        </div>
    )
}