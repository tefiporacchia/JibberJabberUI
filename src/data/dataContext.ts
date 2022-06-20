import { createContext, useContext } from 'react'

import { FullPost, PostData } from './posts'
import { LocalPostData } from './localStorage/localPostData'
import { LocalDataStorage } from './localStorage/localDataStorage'
import {UserData } from './users'
import { LocalUserData } from './localStorage/localUserData'
import {ApiPostData} from "./api/apiPostData";

export interface DataContainer {
  posts: PostData
  users: UserData
}

export const DataContext = createContext<DataContainer>({
  //posts: new LocalPostData(new LocalDataStorage<FullPost>(LocalPostData.type)),
  posts: new ApiPostData(),
  users: new LocalUserData(new LocalDataStorage<string>(LocalUserData.type), ''),
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}

export const useUserData = (): UserData => {
  const dataContainer = useContext(DataContext)
  console.log(dataContainer)
  console.log("users",dataContainer.users)
  return dataContainer.users
}