import { DataContainer } from '../data/dataContext'
import { LocalPostData } from '../data/localStorage/localPostData'
import { FullPost } from '../data/posts'
import { LocalDataStorage } from '../data/localStorage/localDataStorage'
import { LocalUserData } from '../data/localStorage/localUserData'
import {ApiPostData} from "../data/api/apiPostData";

const initialUsers: string[] = ['aa', 'bb', 'cc']

const initialPosts: FullPost[] = [
  {
    id: 'bb558482-6bc9-4529-9551-0a1141741627',
    user: initialUsers[1],
    text: 'Really great',
    thread: [],
  },
  {
    id: '28c0143f-12d7-41e9-85e5-8eb813339862',
    user: initialUsers[1],
    text: 'I\'m great',
    thread: [
      {
        id: '32beae9b-d3af-45bc-88f8-4cb792c95a09',
        user: initialUsers[0],
        text: 'Not that great...',
      },
    ],
  },
  {
    id: '700e1d1a-fcc7-4389-9d2e-159f8419da53',
    user: initialUsers[2],
    text: 'Doh!',
    thread: [],
  },
]

export const createDataContainer = (): Promise<DataContainer> => {

  const postStorage = new LocalDataStorage<FullPost>(LocalPostData.type)

  if (postStorage.getAll().length === 0)
    initialPosts.forEach(post => postStorage.setValue(post.id, post))

  const userStorage = new LocalDataStorage<string>(LocalUserData.type)
  if (userStorage.getAll().length === 0)
    initialUsers.forEach(user => userStorage.setValue(user, user))

  return Promise.resolve({
    /*posts: new LocalPostData(postStorage),*/
    posts: new ApiPostData(),
    users: new LocalUserData(userStorage, initialUsers[0]),
  })
}