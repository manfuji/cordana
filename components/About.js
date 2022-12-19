import React from 'react'
import Image from 'next/image'
import about from '../public/food2.jpeg'
import { useRouter } from 'next/router'
const About = () => {
  const router = useRouter()
  return (
    <div
      id="about"
      className="mb-4 flex w-full items-center justify-center p-2 md:mb-0"
    >
      <div className="m-auto flex w-full max-w-[1240px] flex-col gap-2 md:flex-row">
        <div className="w-full md:w-1/2">
          <p className="  text-2xl font-bold uppercase text-gray-900 md:tracking-widest">
            About
          </p>
          <h2 className="py-4 capitalize">Who Are we and what do we offer?</h2>
          {/* <p className="py-2 capitalize  text-gray-600">
            <span className="text-2xl font-thin">//</span> Your health guidance
          </p> */}
          <p className="py-2 text-gray-600">
            The only constant action I have done all my life was eat, and that
            too multiple times a day AND I HAVEN'T LEARNT HOW TO EAT? That’s
            disgusting” Our Founder, Pranav, grew up as a non-vegetarian, but
            was raised in vegetarian environments. As he got into college, he
            began experimenting with nutrition to work on his fitness.
          </p>
          <p className="py-2 text-gray-600">
            That’s when he learnt about how nutrition impacted his own
            autoimmune predispositions and inner physiology. Scared by the
            potential impacts his food choices and eating habits had had on
            himself, he began working on a method to personalize nutrition for
            his own health, wellness, and taste requirements.
          </p>
          <div className="mx-auto flex max-w-4xl items-center justify-center">
            <button
              className="ml-4 mt-5 mb-12 px-4 md:mb-0"
              onClick={(e) => {
                e.preventDefault()
                router.push('/about')
              }}
            >
              Get to know more about us
            </button>
          </div>
        </div>
        <div className=" relative m-auto flex h-[250px] items-center justify-center rounded  md:mt-24 md:w-1/2">
          <Image
            src={about}
            height={500}
            className="hover:scale-300 absolute h-1/2 rounded-lg ease-in"
          />
        </div>
      </div>
    </div>
  )
}

export default About
