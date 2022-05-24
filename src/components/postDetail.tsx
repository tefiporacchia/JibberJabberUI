import React from 'react'
import { Container, Stack } from '@mui/material'
import { FullPost } from '../data/posts'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { PostCard } from './postCard'

export type PostCardProps = {
  post: FullPost
}

const answerStyle: SxProps<Theme> = {
  margin: '10px 20px',
}

export const PostDetail = ({post}: PostCardProps) => {
  return (
    <Container>
      <PostCard post={post}/>

      <Stack>
        {post.thread
          .map(answer => (<PostCard post={answer} cardSx={answerStyle}/>))
        }
      </Stack>


    </Container>
  )
}
