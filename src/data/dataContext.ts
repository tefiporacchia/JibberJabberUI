import { createContext, useContext } from 'react'

import { FullPost, PostData } from './posts'
import { LocalPostData } from './localStorage/localPostData'
import { LocalDataStorage } from './localStorage/localDataStorage'

export interface DataContainer {
  posts: PostData
}

export const DataContext = createContext<DataContainer>({
  posts: new LocalPostData(new LocalDataStorage<FullPost>(LocalPostData.type)),
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}