import React from 'react'
import StoryViewer from '../../Components/StoryComponents/StoryViewer'

const Story = () => {
    const story = [
        {
            image:"https://www.pexels.com/photo/girls-is-walking-on-the-street-28127548/"
        },
        {
            image:"https://images.pexels.com/photos/29559780/pexels-photo-29559780/free-photo-of-contemplative-black-and-white-outdoor-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            image:"https://images.pexels.com/photos/21404329/pexels-photo-21404329/free-photo-of-women-walking-by-gongora-theater-in-cordoba-in-spain.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            image:"https://images.pexels.com/photos/29371362/pexels-photo-29371362/free-photo-of-fashionable-man-leaning-against-rustic-doorway.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        }, 
        {
            image:"https://images.pexels.com/photos/29484571/pexels-photo-29484571/free-photo-of-exploring-hadrian-s-gate-in-antalya-turkiye.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ]
  return (
    <div>
        <StoryViewer stories={story}/>
    </div>
  )
}

export default Story