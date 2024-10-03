function SignUpErrorDisplay({ error, details }: { 
  error: string;
  details: Array<Array<string>> | null;
}) {
  return (
    <div className='flex flex-col text-red-500 text-sm'>
      <span>{error}</span>
      {(details || []).map(([key, message]) => <span>{key}: {message}</span>)}
    </div>
  )
}

export { SignUpErrorDisplay }