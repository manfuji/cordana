import Head from 'next/head'
import Main from '../components/Main'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import BlogPost from '../components/BlogPost'
const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Cordana Nutrition App</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className="">
        <Main />
        <div className="mt-32 md:mt-24" />
        <About />
        <BlogPost />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default Home
