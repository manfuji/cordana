import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase'

export const postData = () => {
  const [post, setPost] = useState([])

  onSnapshot(
    query(collection(db, 'blogPosts'), orderBy('timestamp', 'desc')),
    (snapshot) => {
      setPost(snapshot.docs)
    }
  )
  return post
}
