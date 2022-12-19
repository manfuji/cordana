import { DoubleBounce } from 'better-react-spinkit'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { authentication, db } from '../../firebase'
import { useStateValue } from '../../context/StateContext'
import { AUTH, PROFILE } from '../../context/Constants'
import { collection, getDocs, query, where } from 'firebase/firestore'
function Login() {
  const [logState, setLogState] = useState(false)
  const router = useRouter()
  const [{ user }, dispatch] = useStateValue()
  console.log(user)

  useEffect(() => {
    if (user) router.push('/')
  }, [user])

  const initialState = {
    username: '',
    password: '',
  }
  const [formdata, setFormdata] = useState(initialState)
  const onChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formdata)
    const { username, password } = formdata
    if (password.length < 6) toast.error('Invalid credentials')
    if (username && password) {
      setLogState(true)
      signInWithEmailAndPassword(authentication, username, password)
        .then(async (res) => {
          const q = query(
            collection(db, 'blogUsers'),
            where('email', '==', username)
          )

          const querySnapshot = await getDocs(q)
          console.log(querySnapshot.docs[0].data())
          dispatch({
            type: PROFILE,
            profile: querySnapshot.docs[0].data(),
          })
          localStorage.setItem(
            'profile',
            JSON.stringify(querySnapshot.docs[0].data())
          )

          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, ' ================> ', doc.data())
          // })

          toast.success('Login successfully')
          localStorage.setItem('user', JSON.stringify(res.user))
          dispatch({
            type: AUTH,
            user: res.user,
          })

          console.log(res)
        })
        .catch((err) => {
          toast.error('Invalid Credentials')
          console.log(err.message.replace(/-/g, ' '))
        })
        .finally(() => setLogState(false))
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 py-20">
      <div className=" max-h-full w-full rounded-lg bg-gray-100 p-10 shadow-lg sm:mx-auto sm:max-w-2xl">
        <h1 className="text-center text-4xl font-bold tracking-widest text-green-600">
          Login
        </h1>
        <div className=" items-center justify-center">
          <form onSubmit={onSubmit} className="flex flex-col space-y-5 py-4">
            <input
              type="email"
              placeholder="email"
              name="username"
              required
              value={formdata.username}
              onChange={onChange}
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              type="password"
              placeholder=" Password"
              name="password"
              required
              value={formdata.password}
              onChange={onChange}
              className="mb-8 rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            {logState ? (
              <div className="mx-auto flex max-w-4xl items-center justify-center">
                <DoubleBounce size={50} color="green" />
              </div>
            ) : (
              ''
            )}
            <button
              // onClick={() => setLogState(true)}
              type="submit"
              className="mt-8 rounded-lg bg-green-600 px-8 py-2 text-lg text-white ring-green-300 hover:bg-green-500 focus:ring-1 active:bg-green-300"
            >
              Login
            </button>
            <Link href="/account/register">
              <a className="text-base font-semibold">
                Don't Have an account?{' '}
                <span className="text-blue-400">Register</span>
              </a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
