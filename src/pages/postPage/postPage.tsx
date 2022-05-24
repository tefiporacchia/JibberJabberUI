import React, { useEffect, useMemo, useState } from 'react'
import { FullPost } from '../../data/posts'
import { usePostData } from '../../data/dataContext'
import { Loading } from '../../components/loading'
import { NotFound } from '../../components/notFound'
import { useParams } from 'react-router-dom'
import { PostDetail } from '../../components/postDetail'
import { MainFrame } from '../../components/mainFrame'

export type PostPageParams = {
  postId: string
}

type PostPageState =
  | {
  loadingState: 'loading'
}
  | {
  loadingState: 'post-not-found'
}
  | {
  loadingState: 'loaded'
  post: FullPost
}

export const PostPage = () => {
  const {postId} = useParams<PostPageParams>()

  const postData = usePostData()

  const [state, setState] = useState<PostPageState>({loadingState: 'loading'})

  useEffect(() => {
    if (postId === undefined)
      setState({loadingState: 'post-not-found'})
    else
      postData.getFullPostById(postId).then(post => {
        if (post === undefined)
          setState({loadingState: 'post-not-found'})
        else
          setState({loadingState: 'loaded', post})
      })
  }, [])

  const content = useMemo(() => {
    switch (state.loadingState) {
      case 'loading':
        return <Loading/>
      case 'post-not-found':
        return <NotFound/>
      case 'loaded':
        const {post} = state
        return (
          <PostDetail post={post}/>
        )
    }
  }, [state])

  return (
    <MainFrame title="Post">
      {content}
    </MainFrame>
  )
}
