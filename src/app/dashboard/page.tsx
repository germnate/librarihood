function Dashboard() {
  return (
    <div className='flex flex-col'>
      <h2 className='text-libraryOrange'>Things I loaned</h2>
      <div className='h-72 w-72'>
        <div className='flex'>
          <div className='w-full h-32 border'>Book Cover</div>
          <div className='w-full h-32 border'>Due Back</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
