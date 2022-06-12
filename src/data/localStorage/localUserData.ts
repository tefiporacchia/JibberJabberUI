import { UserData } from '../users'
import { LocalDataStorage } from './localDataStorage'

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

}