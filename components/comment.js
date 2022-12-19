import React from 'react'

const Comment = ({ name, comment }) => {
  return (
    <div>
      <p className="mt-2 rounded-lg px-3 py-1 text-sm text-gray-500 ring-1 ring-gray-300">
        <span className="flex flex-row items-center space-x-2">
          <img
            src="https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg"
            height={30}
            width={30}
          />
          <span>{name}</span>
        </span>
        {comment}
      </p>
    </div>
  )
}

export default Comment
