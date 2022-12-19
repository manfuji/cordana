import { DoubleBounce } from 'better-react-spinkit'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { db } from '../../firebase'
import { Dialog, Transition } from '@headlessui/react'
import { ChatIcon, XIcon } from '@heroicons/react/outline'
import Comment from '../../components/comment'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import { useStateValue } from '../../context/StateContext'

const DetailPage = () => {
  const router = useRouter()
  const [{ user, stateProfile }] = useStateValue()

  let [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [singlePost, setSinglePost] = useState()
  const { id } = router.query
  console.log(id)
  useEffect(async () => {
    const docRef = doc(db, 'blogPosts', `${id}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setSinglePost(docSnap.data())
      console.log('Document data:', docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }, [id])

  useEffect(() => {
    if (!id) router.push('/')
    return onSnapshot(
      query(
        collection(db, 'blogPosts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs)
      }
    )
  }, [db, id])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // console.log(singlePost.timestamp.nanoseconds)

  // handling form creation for comments
  let initialState = {
    username: user ? stateProfile.username : '',
    comment: '',
  }
  const [formdata, setFormdata] = useState(initialState)

  const onChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formdata)
    const { comment, username } = formdata
    if (comment.trim('').length > 0 && username.trim('').length > 0) {
      await addDoc(collection(db, 'blogPosts', id, 'comments'), {
        comment: comment,
        username: username,
        timestamp: serverTimestamp(),
      })
        .then((resp) => {
          setFormdata({
            username: '',
            comment: '',
          })
          toast.success('Comment added successfully')
        })
        .catch((err) => {
          toast.error('something went wrong')
        })
    } else {
      toast.error('Please enter your details')
    }
  }
  console.log(user)
  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-1 items-center justify-center">
      <div className="mt-5 flex h-full w-[90%] items-center justify-center rounded-xl shadow-xl duration-300 ease-in">
        <div className="flex flex-col items-center justify-center gap-4">
          {singlePost ? (
            <>
              <div className=" relative ">
                <img
                  className="m-auto h-1/2 w-[90%]"
                  src={singlePost?.postImage}
                />
              </div>
              <div className="flex flex-col flex-wrap items-center justify-center space-y-2 py-3 px-2">
                <h3>{singlePost?.title}</h3>
                <div className="">{singlePost?.content}</div>
                <div className="flex h-full w-full flex-row justify-between px-6 text-sm text-gray-400">
                  <span>{singlePost?.username}</span>
                  <span>{format(new Date(singlePost?.timestamp.seconds))}</span>
                </div>
                <div className=" inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-green-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white"
                  >
                    {comments.length}
                    {'  '}comments
                  </button>
                  {/* <div className="ml-5 flex flex-row">
                      <ChatIcon className="inline-flex h-8 w-8" />{' '}
                      <span className="-ml-3 h-5 rounded-full bg-white font-bold text-green-600">
                        {comments.length}
                      </span>
                    </div> */}
                </div>
              </div>
            </>
          ) : (
            <div className="mx-auto flex max-w-4xl items-center justify-center">
              <DoubleBounce size={50} color="green" />
            </div>
          )}
        </div>
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-200 p-6 text-left align-middle shadow-xl transition-all">
                      <div className="flex flex-row items-center justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Comments
                        </Dialog.Title>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex text-red-600"
                            onClick={closeModal}
                          >
                            <XIcon className="h-8 w-8" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        {comments.map((comment, index) => (
                          <div key={comment.id}>
                            <Comment
                              name={comment.data().username}
                              comment={comment.data().comment}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <form
                          onSubmit={onSubmit}
                          className="flex flex-col space-y-5 py-4"
                        >
                          {!user && (
                            <input
                              type="text"
                              placeholder="Username"
                              name="username"
                              required
                              value={formdata.username}
                              onChange={onChange}
                              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
                            />
                          )}
                          <textarea
                            type="text"
                            placeholder=" Comment........."
                            name="comment"
                            required
                            value={formdata.comment}
                            cols={4}
                            onChange={onChange}
                            className="mb-8 rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
                          />
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            // onClick={closeModal}
                            // disabled={!formdata.username || !formdata.comment}
                          >
                            Add comment
                          </button>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      </div>
    </div>
  )
}

export default DetailPage
