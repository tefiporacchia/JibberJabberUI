import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography } from '@mui/material'

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
      setState({
        loaded: true,
        posts,
        user,
      })
    })
  }, [])

  if (!state.loaded)
    return <Loading/>

  const {posts, user} = state


  return (
    <MainFrame title="Home">
      <Feed posts={posts} user={user}/>
    </MainFrame>
  )
}
