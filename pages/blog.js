import React from 'react'
import Banner from '../components/Banner'
import Featured from '../components/Featured'
import BlogPost from '../components/BlogPost'

const Blog = () => {
  return (
    <div className="h-full w-full flex-1 bg-white">
      <section className="container mx-auto">
        <Banner />
      </section>
      {/* featured post  */}
      <section className="mt-5">
        <Featured />
      </section>
      <section className="">
        <BlogPost main={true} />
      </section>
    </div>
  )
}

export default Blog
