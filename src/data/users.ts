
export interface UserData {
  getCurrentUser(): Promise<string | undefined>

  getUserById(userId: string): Promise<string | undefined>

  searchUser(criteria: string): Promise<string[]>
}
