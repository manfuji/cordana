import Image from 'next/image'
import React, { useState } from 'react'
import contact from '../public/contact.jpg'
import { AiOutlineMail } from 'react-icons/ai'
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'
import { ChevronDoubleUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { DoubleBounce } from 'better-react-spinkit'
const Contact = () => {
  const initialState = {
    username: '',
    phoneNumber: 0,
    email: '',
    message: '',
    subject: '',
  }
  const [formdata, setFormdata] = useState(initialState)
  const [isloading, setIsloading] = useState(false)
  const onChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const { email, phoneNumber, subject, username, message } = formdata
    if (
      email.trim('').length > 0 &&
      phoneNumber.trim('').length > 0 &&
      username.trim('').length > 0 &&
      subject.trim('').length > 0
    ) {
      await addDoc(collection(db, 'contactInformations'), {
        username: username,
        email: email,
        subject: subject,
        phoneNumber: phoneNumber,
        message: message,
      })
        .then((response) => {
          toast.success(
            'Your message has been sent successfully we will get back to you soon'
          )
        })
        .catch((error) => toast.error('Something went wrong '))
        .finally((res) => {
          setIsloading(false)
          setFormdata(initialState)
        })
    }
    console.log(formdata)
  }
  return (
    <div id="contact" className="mb-4 w-full md:mb-0 lg:h-screen">
      <div className="m-auto w-full max-w-[1240px] px-2 py-16 ">
        <p className="text-2xl font-bold uppercase text-gray-900 md:tracking-widest">
          Contact Us
        </p>
        <h2 className=" py-4">Get In Touch</h2>
        <div className="grid gap-8 lg:grid-cols-5">
          {/* left  */}
          <div className="col-span-3 h-full w-full rounded-xl p-4 shadow-md shadow-gray-400 lg:col-span-2">
            <div className="h-full lg:p-4 ">
              <div>
                <Image
                  className="rounded-xl duration-300 ease-in hover:scale-105"
                  src={contact}
                />
              </div>
              <div>
                <h2 className="py-2 uppercase">Cordana Ecosystem</h2>
                <p>
                  The only constant action I have done all my life was eat, and
                  that too multiple times a day AND I HAVEN'T LEARNT HOW TO EAT?
                  That’s disgusting” Our Founder, Pranav, grew up as a
                  non-vegetarian, but was raised in vegetarian environments. As
                  he got into college, he began experimenting with nutrition to
                  work on his fitness.
                </p>
              </div>
              <div>
                <p className="pt-4 uppercase">Connect with Us</p>
                <div className="flex items-center justify-center py-4">
                  <div className="flex w-full items-center justify-between sm:w-[80%]">
                    <div className="cursor-pointer  rounded-full p-3 shadow-xl shadow-gray-400 duration-150 ease-in hover:scale-105">
                      <FaFacebook color="blue" />
                    </div>
                    <div className="cursor-pointer rounded-full p-3 shadow-xl shadow-gray-400 duration-150 ease-in hover:scale-105">
                      <FaLinkedin />
                    </div>

                    <div className="cursor-pointer rounded-full p-3 shadow-xl shadow-gray-400 duration-150 ease-in hover:scale-105">
                      <FaTwitter />
                    </div>
                    <div className="cursor-pointer rounded-full p-3 shadow-xl shadow-gray-400 duration-150 ease-in hover:scale-105">
                      <AiOutlineMail />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right  */}
          <div className=" col-span-3 w-full rounded-xl shadow-lg shadow-gray-400 lg:p-4">
            <div className="p-4">
              <h2 className="mb-2 text-center">Send A Message</h2>
              <form onSubmit={onSubmit}>
                <div className="grid w-full gap-4 py-2 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="py-2 text-sm uppercase"> Name</label>
                    <input
                      type="text"
                      name="username"
                      value={formdata.username}
                      onChange={onChange}
                      className="flex rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="py-2 text-sm uppercase">
                      {' '}
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={formdata.phoneNumber}
                      onChange={onChange}
                      className="flex rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                    />
                  </div>{' '}
                </div>
                <div className="flex flex-col">
                  <label className="py-2 text-sm uppercase"> Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formdata.email}
                    onChange={onChange}
                    className="flex rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="py-2 text-sm uppercase"> Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formdata.subject}
                    onChange={onChange}
                    className="flex rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="py-2 text-sm uppercase"> Message</label>
                  <textarea
                    type="text"
                    name="message"
                    value={formdata.message}
                    onChange={onChange}
                    className="flex rounded-lg border-2 border-gray-300 p-3 px-3 py-1 outline-none"
                    rows="10"
                  />
                </div>
                {isloading ? (
                  <div className="mx-auto flex max-w-4xl items-center justify-center">
                    <DoubleBounce size={50} color="green" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="mt-4 w-full bg-green-600 py-2 duration-500 ease-in "
                  >
                    Send Message
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Link href="/">
            <div className="cursor-pointer rounded-full p-3 shadow-xl shadow-gray-400 duration-150 ease-in hover:scale-105">
              <ChevronDoubleUpIcon className="h-8 w-8 text-red-700" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
