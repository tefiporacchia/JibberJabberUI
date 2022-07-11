import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Post } from '../../data/posts'
import { Feed } from '../../components/feed'
import { usePostData } from '../../data/dataContext'
import { Loading } from '../../components/loading'
import { MainFrame } from '../../components/mainFrame'
import { CreatePostCard } from '../../components/createPostCard'
import { UserContext } from '../../components/contexts/userContext'
import { Container } from '@mui/material'
import { useKeycloak } from "@react-keycloak/web";
import keycloak from "../../Keycloak";


type HomeState =
  | {
  loaded: false
}
  | {
  loaded: true
  posts: Post[]
}

export const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const postData = usePostData()
  const user = useContext(UserContext)

  const [state, setState] = useState<HomeState>({loaded: false})

  useEffect(() => {
    console.log(keycloak?.token);
    if(keycloak?.token){
      console.log("entra a la rq")

      const dat = async () =>{
        await postData.getFeedPosts().then(posts => {
          console.log(posts)
          setState({loaded: true, posts})
          console.log(state.loaded)
        })
      }

      const timer = setTimeout(() => {
        dat();
      }, 1000);

      return () => clearTimeout(timer);

    }

  }, [postData])

  const refreshPosts = useCallback(() => {
    console.log(keycloak?.token);
    postData.getFeedPosts()
      .then(posts => setState(state => state.loaded ? ({...state, posts}) : state))
  }, [state, postData])

  const handleCreatePost = useCallback((postText: string) => {
    console.log(user)
    console.log(keycloak.tokenParsed?.given_name);
    if (state.loaded)
      postData.createPost({user, text: postText})
        .then(() => refreshPosts())
        .catch(error => console.error('Error while creating new post', error))
  }, [state, postData, user])

  if (!state.loaded)
    return <Loading/>

  const {posts} = state

  return (
    <MainFrame title="Home">
      <Container>
        <CreatePostCard buttonMessage="Post it!" placeholder="What's happening?" onPost={handleCreatePost}/>
        <Feed posts={posts}/>
      </Container>
    </MainFrame>
  )
}
