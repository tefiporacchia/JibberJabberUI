import { User, UserData } from '../users'
import { LocalDataStorage } from './localDataStorage'

export class LocalUserData implements UserData {
  static type: string = 'user'

  constructor(
    private readonly data: LocalDataStorage<User>,
    private readonly currentUserId: string,
  ) {}

  getCurrentUser(): Promise<User | undefined> {
    console.log(this.currentUserId)
    console.log(this.data.getValue(this.currentUserId))
    return Promise.resolve(this.data.getValue(this.currentUserId))
  }

  getUserById(userId: string): Promise<User | undefined> {
    return Promise.resolve(this.data.getValue(userId))
  }

  searchUser(searchString: string): Promise<User[]> {
    const result = this.data.getAllByPredicate(user =>
      user.name.includes(searchString) || user.name.includes(searchString),
    )

    return Promise.resolve(result)
  }

}