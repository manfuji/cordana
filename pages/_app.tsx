import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { StateContext } from '../context/StateContext'
import { initialState } from '../context/initialState'
import Layout from '../components/layout/Layout'
import { Reducer } from '../context/reducer'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StateContext reducer={Reducer} initialState={initialState}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer autoClose={6000} hideProgressBar />
        </Layout>
      </StateContext>
    </>
  )
}

export default MyApp
