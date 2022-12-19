import { DoubleBounce } from 'better-react-spinkit'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { authentication, db, storage } from '../firebase'
import { useStateValue } from '../context/StateContext'
import { AUTH } from '../context/Constants'
import {} from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { CameraIcon } from '@heroicons/react/outline'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
function CreatePost() {
  const [logState, setLogState] = useState(false)
  const router = useRouter()
  // const [{ user }, dispatch] = useStateValue()
  const auth = getAuth()
  const user = auth.currentUser

  const initialState = {
    title: '',
    excerpt: '',
    content: '',
  }
  const [formdata, setFormdata] = useState(initialState)
  const [selectedFile, setSelectedFile] = useState(null)
  const [{ stateProfile }] = useStateValue()
  const filePicker = useRef(null)
  const onChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }
  const addImagetoPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    if (!user) toast.error('Please you cannot upload post')
    const { title, excerpt, content } = formdata
    if (title && excerpt && content) {
      setLogState(true)

      const docRef = await addDoc(collection(db, 'blogPosts'), {
        username: stateProfile.username,
        title: title,
        excerpt: excerpt,
        content: content,
        postImage: user.photoURL,
        timestamp: serverTimestamp(),
      })
      console.log('posting uploaded', docRef)

      const imageRef = ref(storage, `blogPosts/${docRef.id}/image`)

      await uploadString(imageRef, selectedFile, 'data_url')
        .then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef)

            await updateDoc(doc(db, 'blogPosts', docRef.id), {
              postImage: downloadUrl,
            })
          },
          setFormdata({
            title: '',
            excerpt: '',
            content: '',
          }),
          setSelectedFile(null),
          toast.success('Blog created succesfully')
        )
        .catch((err) => {
          toast.error('Somehting went wrong')
          console.log(err)
          setLogState(false)
        })

      setLogState(false)

      console.log(formdata)
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 py-20">
      <div className=" max-h-full w-full rounded-lg bg-gray-100 p-10 shadow-lg sm:mx-auto sm:max-w-2xl">
        <h1 className="text-center text-4xl font-bold tracking-widest text-green-600">
          Create Post
        </h1>
        <div className=" items-center justify-center">
          <form onSubmit={onSubmit} className="flex flex-col space-y-5 py-4">
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              value={formdata.title}
              onChange={onChange}
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <textarea
              type="text"
              placeholder=" Excerpt"
              name="excerpt"
              required
              value={formdata.excerpt}
              cols={4}
              onChange={onChange}
              className="mb-8 rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <textarea
              type="text"
              placeholder=" content"
              name="content"
              required
              cols={6}
              value={formdata.content}
              onChange={onChange}
              className="mb-8 rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            {selectedFile ? (
              <img
                src={selectedFile}
                onClick={() => setSelectedFile(null)}
                className="mx-auto flex h-28  w-32 cursor-pointer justify-center rounded-lg hover:cursor-pointer"
              />
            ) : (
              <div
                className="flex cursor-pointer items-center justify-center"
                onClick={() => filePicker.current.click()}
              >
                <span className="mr-4">Add Picture</span>
                <CameraIcon
                  className="h-6 w-6 text-center text-green-500"
                  aria-hidden="true"
                />
              </div>
            )}
            <input
              type="file"
              required
              hidden
              ref={filePicker}
              // value={selectedFile}
              onChange={addImagetoPost}
              className="mb-8 rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            {logState ? (
              <div className="mx-auto flex max-w-4xl items-center justify-center">
                <DoubleBounce size={50} color="green" />
              </div>
            ) : (
              <button
                // onClick={() => setLogState(true)}
                disabled={!selectedFile}
                type="submit"
                className="mt-8 rounded-lg bg-green-600 px-8 py-2 text-lg text-white ring-green-300 hover:bg-green-500 focus:ring-1 active:bg-green-300"
              >
                Create Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
