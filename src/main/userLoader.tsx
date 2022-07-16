import React, { ReactNode, useEffect, useState } from 'react'
import { User } from '../data/users'
import { Loading } from '../components/loading'
import { UserContext } from '../components/contexts/userContext'
import { useUserData } from '../data/dataContext'
import { Unauthenticated } from '../components/unauthenticated'
import { isNotUndefined } from '../utils/undefined'
import {useKeycloak} from "@react-keycloak/web";

export type UserLoaderProps = {
  children: ReactNode
}

type UserLoaderState =
  | {
  status: 'loading'
}
  | {
  status: 'unauthenticated'
}
  | {
  status: 'loaded'
  user: User
}

export const UserLoader = ({children}: UserLoaderProps) => {
  const userData = useUserData()
  const { initialized } = useKeycloak()

  const [state, setState] = useState<UserLoaderState>({status: 'loading'})

  useEffect(() => {
    userData.getCurrentUser().then((user) => {
      if (isNotUndefined(user)){
        setState({status: 'loaded', user})
      }
      else{
        setState({status: 'unauthenticated'})
      }

    })
  }, [])

  /*useEffect(() => {
    setState({status: 'loading'})
    if (initialized) {
      userData.getCurrentUser().then((user) => {
        console.log(user)
        if (isNotUndefined(user)){
          setState({status: 'loaded', user})
          console.log(user)
        }
        else{
          setState({status: 'unauthenticated'})
        }
      })
    }
  }, [initialized, userData])*/

  switch (state.status) {
    case 'loading':
      return <Loading/>
    case 'unauthenticated':
      return <Unauthenticated/>
    case 'loaded':
      return (
          <UserContext.Provider value={state.user}>
            {children}
          </UserContext.Provider>
      )
  }
}