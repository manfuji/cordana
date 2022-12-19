import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { AiOutlineMail } from 'react-icons/ai'
import { FaLinkedin, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateContext'
import { getAuth, signOut } from 'firebase/auth'
import { authentication } from '../../firebase'
import { AUTH, AUTH_FAILED, PERMISSION } from '../../context/Constants'
import { toast } from 'react-toastify'
const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [{ user, stateProfile, post }, dispatch] = useStateValue()

  console.log('profile', stateProfile)

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true)
      } else {
        setShadow(false)
      }
    }
    window.addEventListener('scroll', handleShadow)
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    console.log('first')
    localStorage.removeItem('user')
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({
          type: AUTH,
          user: null,
        })
        toast.success('signOut sucessfull')
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message)
      })
  }

  return (
    <div
      className={
        shadow
          ? ' fixed  z-[100] flex h-20 w-full items-center justify-center bg-white shadow-xl md:mb-0'
          : ' fixed z-[100] flex h-20 w-full items-center justify-center bg-white md:mb-0 '
      }
    >
      <div className="flex h-full w-full items-center justify-between px-2 2xl:p-16">
        <img
          // layout="fill"
          src="/logo.png"
          alt=""
          height="50"
          width="125"
        />
        <div>
          <ul className=" hidden items-center justify-center md:flex">
            <Link href="/">
              <li className="ml-10 cursor-pointer text-sm  font-semibold uppercase hover:border-b">
                Home
              </li>
            </Link>
            <Link href="/#about">
              <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                About
              </li>
            </Link>
            <Link href="/#contact">
              <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                Contact
              </li>
            </Link>
            <Link href="/#blog">
              <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                Blog
              </li>
            </Link>
            <Link href="/#demo">
              <li className=" ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                Demo
              </li>
            </Link>
            {!user && (
              <Link href="/account/login">
                <li className="ml-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 text-sm font-semibold uppercase hover:border-b focus:bg-green-400">
                  <UserIcon className="h-6 w-6" />
                </li>
              </Link>
            )}
            {user && (
              <>
                {stateProfile && stateProfile.permission === PERMISSION && (
                  <>
                    <Link href="/createBlog">
                      <li className="ml-10 cursor-pointer rounded-2xl bg-green-500 py-1 px-1.5 text-sm font-semibold uppercase text-white hover:border-b">
                        Create Post
                      </li>
                    </Link>
                  </>
                )}
                <Link href="/account/login">
                  <a onClick={handleLogout}>
                    <li className="ml-10 flex cursor-pointer items-center justify-center rounded-full bg-red-400 px-1.5 py-1 text-sm font-semibold uppercase text-white hover:border-b focus:bg-green-400">
                      Logout
                    </li>
                  </a>
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className=" cursor-pointer font-semibold shadow-sm hover:bg-gray-200 md:hidden">
          <MenuIcon className="h-8 w-8" onClick={() => setToggle(!toggle)} />
        </div>
      </div>

      <div
        className={`${
          toggle
            ? ' fixed left-0 top-0 h-screen w-full bg-black/70 md:hidden'
            : ''
        }`}
      >
        <div
          className={`${
            toggle
              ? 'fixed left-0 top-0 h-screen w-[75%] justify-between bg-[#ecf0f3] p-10 transition-all duration-500 ease-in  sm:w-[65%] md:w-[45%]'
              : 'hidden transition-all duration-500 ease-in'
          }`}
        >
          <div className=" flex justify-between">
            <img
              // layout="fill"
              src="/logo.png"
              alt=""
              height="30"
              width="100"
            />
            <div
              className="cursor-pointer rounded-full p-3 font-semibold shadow-xl shadow-gray-400"
              onClick={() => setToggle(!toggle)}
            >
              <XIcon className="inline-flex h-8 w-8 " />
            </div>
          </div>
          <div className="my-4 border-b border-gray-300">
            <p className="w-[85%] md:w-[90%]">
              Let's build healthy Life together!
            </p>
          </div>
          <div className="flex flex-col py-5">
            <ul className=" flex flex-col items-start justify-center space-y-5 ">
              <Link href="/">
                <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                  Home
                </li>
              </Link>
              <Link href="/#about">
                <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                  About
                </li>
              </Link>
              <Link href="/#contact">
                <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                  Contact
                </li>
              </Link>
              <Link href="/#blog">
                <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                  Blog
                </li>
              </Link>
              <Link href="/#demo">
                <li className="ml-10 cursor-pointer text-sm font-semibold uppercase hover:border-b">
                  Demo
                </li>
              </Link>
              {!user && (
                <Link href="/account/login">
                  <li className="ml-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 text-sm font-semibold uppercase hover:border-b focus:bg-green-400">
                    <UserIcon className="h-6 w-6" />
                  </li>
                </Link>
              )}
              {stateProfile && stateProfile.permission === PERMISSION && (
                <>
                  <Link href="/createBlog">
                    <li className="ml-10 cursor-pointer rounded-2xl bg-green-500 py-1 px-1.5 text-sm font-semibold uppercase text-white hover:border-b">
                      Create Post
                    </li>
                  </Link>
                </>
              )}
              {user && (
                <Link href="/account/login">
                  <a onClick={handleLogout}>
                    <li className="ml-10 flex cursor-pointer items-center justify-center rounded-full bg-red-400 px-1.5 py-1 text-sm font-semibold uppercase text-white hover:border-b focus:bg-green-400">
                      Logout
                    </li>
                  </a>
                </Link>
              )}
            </ul>
            <div className="pt-32">
              <p className="uppercase tracking-widest text-green-700">
                connect with us
              </p>
              <div className="flex w-full items-center justify-between sm:w-[80%]">
                <div className="cursor-pointer rounded-full  p-3 font-semibold shadow shadow-gray-400 duration-150 ease-in hover:scale-105">
                  <FaFacebook />
                </div>
                <div className="cursor-pointer rounded-full p-3 font-semibold shadow shadow-gray-400 duration-150 ease-in hover:scale-105">
                  <FaLinkedin />
                </div>
                {/* <div className="cursor-pointer rounded-full p-3 font-semibold shadow shadow-gray-400 duration-150 ease-in hover:scale-105">
                  <FaGithub />
                </div> */}

                <div className="cursor-pointer rounded-full p-3 font-semibold shadow shadow-gray-400 duration-150 ease-in hover:scale-105">
                  <FaTwitter />
                </div>
                <div className="cursor-pointer rounded-full p-3 font-semibold shadow shadow-gray-400 duration-150 ease-in hover:scale-105">
                  <AiOutlineMail />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
