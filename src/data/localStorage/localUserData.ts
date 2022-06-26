import { UserData } from '../users'
import { LocalDataStorage } from './localDataStorage'
import { isNotUndefined, mapUndefined, nonUndefined } from '../../utils/undefined'


export class LocalUserData implements UserData {
  static type: string = 'user'

  constructor(
    private readonly data: LocalDataStorage<string>,
    private readonly currentUserId: string,
  ) {}

  getCurrentUser(): Promise<string | undefined> {
    console.log(this.currentUserId)
    console.log(this.data.getValue(this.currentUserId))
    return Promise.resolve(this.data.getValue(this.currentUserId))
  }

  getUserById(userId: string): Promise<string | undefined> {
    return Promise.resolve(this.data.getValue(userId))
  }

  searchUser(searchString: string): Promise<string[]> {
    const result = this.data.getAllByPredicate(user =>
      user.includes(searchString) || user.includes(searchString),
    )

    return Promise.resolve(result)
  }

  isFollowed(userId: string): Promise<boolean | undefined> {
   /* const result = mapUndefined(this.data.getValue(this.currentUserId), user => user?.isFollowed)*/
    return Promise.resolve(false)
  }

  toggleFollow(userId: string): Promise<void> {
   /* const newUser = mapUndefined(
      this.data.getValue(this.currentUserId),
      user => ({...user, isFollowed: !nonUndefined(user.isFollowed, false)}),
    )

    if (isNotUndefined(newUser))
      this.data.setValue(newUser.id, newUser)*/

    return Promise.resolve(undefined)
  }

}