import { DoubleBounce } from 'better-react-spinkit'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { authentication, db } from '../../firebase'
import { useStateValue } from '../../context/StateContext'
import { addDoc, collection } from 'firebase/firestore'
function Register() {
  const [logState, setLogState] = useState(false)
  const router = useRouter()

  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if (user) router.push('/')
  }, [])

  const initialState = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    password2: '',
  }
  const [formdata, setFormdata] = useState(initialState)
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }

  console.log(formdata)
  const onSubmit = (e) => {
    e.preventDefault()
    setLogState(true)
    const { email, password, password2, firstname, lastname, username } =
      formdata
    if (email && password.length > 6) {
      if (password !== password2) {
        toast.warn('password do not match')
        setLogState(false)
      } else {
        createUserWithEmailAndPassword(authentication, email, password)
          .then((res) => {
            addDoc(collection(db, 'blogUsers'), {
              firstname: firstname,
              lastname: lastname,
              permission: 101,
              username: username,
              email: email,
            })
              .then((res) => {
                toast.success('User created successfully')
                console.log(res)
                setLogState(false)
                router.push('/account/login')
                setFormdata(initialState)
              })
              .catch((err) => toast.error('something went wrong'))
          })
          .catch((err) => {
            toast.error(err.message.replace(/-/g, ' '))
            console.log(err.message.replace(/-/g, ' '))
          })
          .finally(() => setLogState(false))
      }
    } else if (password?.length < 6) {
      toast.warning('Password is too short')
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 py-20">
      <div className="max-h-full w-full rounded-lg bg-gray-100  p-10 shadow-lg sm:mx-auto sm:max-w-2xl">
        <h1 className="text-center text-4xl font-bold tracking-widest text-green-600">
          Register
        </h1>
        <div className=" items-center justify-center">
          <form onSubmit={onSubmit} className="flex flex-col space-y-2 py-4">
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={formdata.firstname}
              onChange={onChange}
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              value={formdata.lastname}
              onChange={onChange}
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              value={formdata.username}
              onChange={onChange}
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              required
              type="email"
              name="email"
              value={formdata.email}
              onChange={onChange}
              placeholder="Email(very Important)"
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              required
              type="password"
              name="password"
              value={formdata.password}
              onChange={onChange}
              placeholder=" Password"
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            <input
              required
              type="password"
              name="password2"
              value={formdata.password2}
              onChange={onChange}
              placeholder="Confirm Password"
              className="rounded-md px-10 py-2 placeholder-gray-400 outline-none ring-green-400 focus:ring-1"
            />
            {logState ? (
              <div className="mx-auto flex max-w-4xl items-center justify-center">
                <DoubleBounce size={50} color="green" />
              </div>
            ) : (
              ''
            )}
            <button
              type="submit"
              className="mt-2 rounded-lg bg-green-600 px-8 py-2 text-lg text-white ring-green-200 hover:bg-green-600 focus:ring-1 active:bg-green-500"
            >
              Register
            </button>
            <Link href="/account/login">
              <a className="text-base font-semibold">
                Have an account? <span className="text-blue-400">Login</span>
              </a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
