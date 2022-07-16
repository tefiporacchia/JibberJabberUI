import { DataContainer } from '../data/dataContext'
import { LocalPostData } from '../data/localStorage/localPostData'
import { FullPost } from '../data/posts'
import { User } from '../data/users'
import { LocalDataStorage } from '../data/localStorage/localDataStorage'
import { LocalUserData } from '../data/localStorage/localUserData'
import {ApiPostData} from "../data/api/apiPostData";
import {UserApi} from "../data/api/apiUserData";


const initialUsers: User[] = []

const initialPosts: FullPost[] = []

export const createDataContainer = (): Promise<DataContainer> => {

  const postStorage = new LocalDataStorage<FullPost>(LocalPostData.type)

  if (postStorage.getAll().length === 0)
    initialPosts.forEach(post => postStorage.setValue(post.id, post))

  const userStorage = new LocalDataStorage<User>(LocalUserData.type)

  if (userStorage.getAll().length === 0)
    initialUsers.forEach(user => userStorage.setValue(user.id, user))

  return Promise.resolve({
    posts: new ApiPostData(),
    users: new UserApi()
  })
}