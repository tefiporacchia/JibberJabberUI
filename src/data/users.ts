export type User = {
  id: string
  displayName: string
  username: string
  avatar: string
}

export const getUserData = (): Promise<User> => Promise.resolve({
  id: '1',
  displayName: 'Bird Person',
  username: 'little_bird',
  avatar: '/generic-avatar.jpg',
})