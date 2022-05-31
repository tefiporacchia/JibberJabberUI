import React, { useCallback, useEffect, useState } from 'react'

import { Post } from '../../data/posts'
import { getUserData, User } from '../../data/users'
import { Feed } from '../../components/feed'
import { usePostData } from '../../data/dataContext'
import { Loading } from '../../components/loading'
import { MainFrame } from '../../components/mainFrame'

type HomeState =
  | {
  loaded: false
}
  | {
  loaded: true
  posts: Post[]
  user: User
}

export const Home = () => {
  const postData = usePostData()

  const [state, setState] = useState<HomeState>({loaded: false})

  useEffect(() => {
    Promise.all([getUserData(), postData.getFeedPosts()]).then(([user, posts]) => {
      setState({loaded: true, posts, user})
    })
  }, [])

  const refreshPosts = useCallback(() => {
    postData.getFeedPosts()
      .then(posts => setState(state => state.loaded ? ({...state, posts}) : state))
  }, [state, postData])

  const handleCreatePost = useCallback((postText: string) => {
    if (state.loaded)
      postData.createPost({user: state.user, text: postText})
        .then(() => refreshPosts())
        .catch(error => console.error('Error while creating new post', error))
  }, [state, postData])

  if (!state.loaded)
    return <Loading/>

  const {posts, user} = state

  return (
    <MainFrame title="Home">
      <Feed posts={posts} user={user} onUserPost={handleCreatePost}/>
    </MainFrame>
  )
}
