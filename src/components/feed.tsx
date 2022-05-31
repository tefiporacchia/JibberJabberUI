import React from 'react'
import { CreatePostCard, CreatePostCardProps } from './createPostCard'
import { Post } from '../data/posts'
import { PostCard } from './postCard'
import { Container, Stack } from '@mui/material'

export type FeedProps = CreatePostCardProps & {
  posts: Post[]
}

export const Feed = ({posts, ...postCardProps}: FeedProps) => {
  return (
    <Container>
      <CreatePostCard {...postCardProps}/>

      <Stack>

        {posts
          .map(post => <PostCard key={post.id} post={post} shouldNavigate/>)
        }
      </Stack>
    </Container>
  )
}
