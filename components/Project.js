import { PlayIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FaVideo } from 'react-icons/fa'

const Project = ({ image, name, projectUrl }) => {
  return (
    <div className=" group  relative mx-auto flex h-auto w-full items-center justify-center rounded-xl from-green-600 to-purple-700 p-4 shadow-xl shadow-gray-400 hover:bg-gradient-to-tr ">
      <Image
        src={image}
        alt="/"
        className="rounded-xl group-hover:opacity-10"
      />
      <div className="absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block ">
        <h3 className="text-2xl capitalize text-white">{name} </h3>
        <p className="pb-4 pt-2 text-center text-white">Feature</p>
        <Link href={projectUrl}>
          <p className="cursor-pointer rounded-lg bg-white px-3 py-3 text-center text-sm font-bold text-green-700 duration-700 ease-in-out hover:scale-150 md:text-lg">
            <PlayIcon className="inline h-8 w-8" /> Watch full video
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Project
