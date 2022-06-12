export type User = {
  name: string
}

export interface UserData {
  getCurrentUser(): Promise<User | undefined>

  getUserById(userId: string): Promise<User | undefined>

  searchUser(criteria: string): Promise<User[]>
}
