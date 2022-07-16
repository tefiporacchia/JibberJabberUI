import { createContext, useContext } from 'react'
import { FullPost, PostData } from './posts'
import {UserData, User } from './users'
import {ApiPostData} from "./api/apiPostData";
import {UserApi} from "./api/apiUserData";

export interface DataContainer {
  posts: PostData
  users: UserData
}

export const DataContext = createContext<DataContainer>({
  posts: new ApiPostData(),
  users: new UserApi()
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}

export const useUserData = (): UserData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.users
}