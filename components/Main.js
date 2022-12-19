import React from 'react'
import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import Image from 'next/image'
import about from '../public/c1.png'
import appPicture from '../public/cover.png'

const Main = () => {
  return (
    <div
      id="home"
      className=" h-screen w-full items-center justify-center pt-32 text-center sm:mt-0"
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] flex-col items-center justify-evenly p-2 md:flex-row md:space-x-8">
        <div className="w-full md:w-2/3">
          <p className="py-2 text-sm uppercase tracking-widest text-gray-600">
            Let's build a healthy Life together !
          </p>
          <h1>
            <span className="capitalize text-green-600"> Cordana </span>{' '}
            <span className="capitalize text-purple-600"> Presents </span>
          </h1>
          <h1 className="py-2 capitalize text-gray-700 ">
            Personalized Nutrition Tracking Application
          </h1>
          <p className="mx-auto max-w-[70%] py-4 text-gray-600">
            Cordana is the app to personalize your nutrition and reach your
            daily nutritional goals. Consume the right foods, at the right
            times, for your health requirements.
          </p>
          <div className="ml-3 flex max-w-lg items-center justify-between space-x-1 py-4 md:m-auto md:space-x-4">
            <button className="animate-bounce py-2 px-6 duration-700 ease-in  ">
              Download APP
            </button>
            <button className="animate-bounce py-2 px-6 duration-700 ease-in">
              Watch A demo
            </button>

            {/* <div className="cursor-pointer  rounded-full p-3 shadow-lg shadow-gray-400 duration-150 ease-in hover:scale-110 md:p-6">
              <FaLinkedinIn />
            </div>
            <div className="cursor-pointer  rounded-full p-3 shadow-lg shadow-gray-400 duration-150 ease-in hover:scale-110 md:p-6">
              <FaGithub />
            </div>
            <div className="cursor-pointer  rounded-full p-3 shadow-lg shadow-gray-400 duration-150 ease-in hover:scale-110 md:p-6">
              <FaTwitter />
            </div>
            <div className="cursor-pointer  rounded-full p-3 shadow-lg shadow-gray-400 duration-150 ease-in hover:scale-110 md:p-6">
              <FaFacebook />
            </div>
            <div className="cursor-pointer  rounded-full p-3 shadow-lg shadow-gray-400 duration-150 ease-in hover:scale-110 md:p-6">
              <AiOutlineMail />
            </div> */}
          </div>
        </div>
        <div className=" relative m-auto flex h-[700px] w-full items-center justify-center rounded  md:w-1/2">
          <Image
            src={about}
            className="hover:scale-300 absolute rounded ease-in"
          />
          <Image
            src={appPicture}
            className="hover:scale-300 absolute rounded ease-in"
          />
        </div>
      </div>
    </div>
  )
}

export default Main
