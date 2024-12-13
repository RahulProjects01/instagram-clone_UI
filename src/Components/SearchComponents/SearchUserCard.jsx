import React from 'react'

const SearchUserCard = () => {
  return (
    <div className='py-2 cursor-pointer'>
      <div className='flex items-center'>
        <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/02/22/19/13/reading-7807231_960_720.jpg" alt="" />

        <div className='ml-2 '>
          <p>Full Name</p>
          <p className='opacity-70'>username</p>
        </div>
      </div>
    </div>
  )
}

export default SearchUserCard