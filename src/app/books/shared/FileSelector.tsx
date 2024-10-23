import { RefObject } from "react"

export const COVER_TYPE = {
  FILE: 'file',
  URL: 'url'
}

export function FileSelector({ coverType, setCoverType, fileInputRef }:
  { coverType: string, setCoverType: (arg: string) => void, fileInputRef: RefObject<HTMLInputElement> }) {
  return (
    <>
      <div className='flex gap-2'>
        <input
          id='file-label'
          type='radio'
          name='select'
          onChange={() => setCoverType(COVER_TYPE.FILE)}
          value={coverType}
          checked={coverType === COVER_TYPE.FILE}
        />
        <label htmlFor='file-label'>File</label>
      </div>
      <div className='flex gap-2'>
        <input
          id='url-label'
          type='radio'
          name='select'
          onChange={() => setCoverType(COVER_TYPE.URL)}
          value={coverType}
          checked={coverType === COVER_TYPE.URL}
        />
        <label htmlFor='url-label'>Url</label>
      </div>
      <input
        ref={fileInputRef}
        type='file'
        accept='.jpg, .png, .webp'
        className={coverType !== 'file' ? 'hidden' : 'p-2 border'}
      />
      <input
        name='thumbnail'
        className={coverType === 'file' ? 'hidden' : 'p-2 border'}
      />
    </>
  )
}