import Image from 'next/image'
import React from 'react'
// import banner from '../public/banner.jpg'
function Banner() {
  return (
    <div className="relative mx-auto h-[500px] w-full md:w-[100%] ">
      <img
        src="https://images.unsplash.com/photo-1457347876270-97799484c564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhbHRoeSUyMGVhdGluZyUyMHJlY3RhbmdsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        className=" absolute h-[500px] w-full object-fill object-left"
      />
      <div className=" absolute left-[10%] top-64 sm:left-[30%] md:left-[50%] md:top-[50%] xl:top-[60%]">
        <h1 className="capitalize text-gray-600">
          best updates on Healthy living
        </h1>
        <h2 className="font-thin text-slate-600 xl:text-2xl">
          “He who has health has hope and he who has hope has everything.”
          “Let's build wellness rather than treat disease.” “A healthy outside
          starts from the inside.” “It is health that is real wealth and not
          pieces of gold and silver.
        </h2>
      </div>
    </div>
  )
}

export default Banner
