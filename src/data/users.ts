
export interface UserData {
  getCurrentUser(): Promise<string | undefined>

  getUserById(userId: string): Promise<string | undefined>

  //searchUser(criteria: string): Promise<string[]>

  isFollowed(userId: string): Promise<boolean | undefined>

  toggleFollow(userId: string): Promise<void>
}
