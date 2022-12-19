import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import food from '../public/food.jpg'
const Post = ({ title, content, picture, id, username, timestamp }) => {
  return (
    <div className="h-[400px] w-[290px] cursor-pointer rounded-xl shadow-xl duration-300 ease-in hover:scale-105">
      <Link href={`/post/${id}`}>
        <a>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className=" relative m-auto h-[200px] w-[280px]">
              <Image
                src={picture ? picture : `/food2.jpeg`}
                alt="/"
                className="absolute"
                layout="fill"
              />
            </div>
            <div className="flex flex-col flex-wrap items-center justify-center space-y-2 py-3 px-2">
              <h3>{title}</h3>
              <div className=" line-clamp-3">{content}</div>
              <div className="flex w-full flex-row justify-between px-6 text-sm text-gray-400">
                <span>{username}</span>
                {/* <span>{new Date(timestamp)}</span> */}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Post
