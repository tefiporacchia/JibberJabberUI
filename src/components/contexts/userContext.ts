
import { createContext, useContext } from 'react'

export const UserContext = createContext<string>(undefined as unknown as string)

export const useUserContext = () => useContext(UserContext)