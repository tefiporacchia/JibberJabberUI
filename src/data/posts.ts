import { User } from './users'
export type Post = {
  id: string
  text: string
  user: User
}

export type FullPost = Post & {
  thread: Post[]
}

export type NewPost = Omit<Post, 'id'>

export type PostToSend = {
  text: string
  user: string
}

export interface PostData {
  getFeedPosts(): Promise<Post[]>

  getFullPostById(id: string): Promise<FullPost | undefined>

  getPostsByUser(userId: string): Promise<Post[]>

  createPost(post: NewPost): Promise<PostToSend>

  answerPost(postId: string, answer: NewPost): Promise<FullPost>

}
