import React from 'react'
import { CreatePostCard } from './createPostCard'
import { Post } from '../data/posts'
import { PostCard } from './postCard'
import { Container, Paper, Stack, Typography } from '@mui/material'
import { User } from '../data/users'

export type FeedProps = {
  posts: Post[]
  user: User
}

export const Feed = ({posts, user}: FeedProps) => {
  return (
    <Container>
      <CreatePostCard user={user}/>

      <Stack>

        {posts
          .map(post => <PostCard key={post.id} post={post} shouldNavigate/>)
        }
      </Stack>
    </Container>
  )
}
