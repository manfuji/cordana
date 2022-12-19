import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
// import { postData } from '../components/data/Apicalls'
const BlogPost = ({ main }) => {
  // console.log(postData)
  const [post, setPost] = useState([])
  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'blogPosts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPost(snapshot.docs)
      }
    )
  }, [db])
  console.log(post)
  return (
    <div
      id="blog"
      className={`w-full ${
        main && 'mt-[10%]'
      } mb-4 mt-8 p-2 md:mb-0 lg:h-screen`}
    >
      <div className=" mx-auto flex h-full max-w-[1240px] flex-col justify-center">
        <p className="text-2xl font-bold uppercase text-gray-900 md:tracking-widest">
          Blog Posts
        </p>
        <h2 className="py-4 capitalize">
          Keep Up with What is happening in the community
        </h2>
        <div className="flex flex-row flex-wrap items-start justify-center gap-4">
          {main
            ? post.map((post) => (
                <div key={post.id}>
                  <Post
                    id={post.id}
                    title={post.data().title}
                    content={post.data().content}
                    picture={post.data().postImage}
                    username={post.data().username}
                    timestamp={post.data().timestamp}
                  />
                </div>
              ))
            : post.slice(0, 4).map((post) => (
                <div key={post.id}>
                  <Post
                    id={post.id}
                    title={post.data().title}
                    content={post.data().content}
                    picture={post.data().postImage}
                    username={post.data().username}
                    timestamp={post.data().timestamp}
                  />
                </div>
              ))}
        </div>
        {!main && (
          <div className="mx-auto mt-2 flex max-w-4xl items-center justify-center">
            <Link href="/blog">
              <button className="ml-5 mt-6 w-64">Read more...</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost
