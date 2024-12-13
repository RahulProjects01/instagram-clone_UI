import React from 'react'
import SuggetionCard from './SuggetionCard'
import CreatePostModel from '../Post/CreatePostModel'

const HomeRight = () => {
  return (
    <div className=''>
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div>
              <img className='w-12 h-12 rounded-full' src="https://cdn.pixabay.com/photo/2023/01/30/11/04/cat-7755394_1280.jpg" alt="" />
            </div>

            <div className='ml-3'>
              <p>Full Name</p>
              <p className='opacity-70'>username</p>
            </div>
          </div>


          <div>
            <p className='text-blue-700 font-semibold'>Switch</p>
          </div>

        </div>
        <div className='space-y-5 mt-10'>
          {[1, 1, 1, 1, 1, 1, 1].map((item) => <SuggetionCard />)}
        </div>

      </div>

      <CreatePostModel />
    </div>
  )
}

export default HomeRight