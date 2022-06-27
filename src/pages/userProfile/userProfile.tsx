import React, { useCallback } from 'react'
import { MainFrame } from '../../components/mainFrame'
import { useParams } from 'react-router-dom'
import { usePostData, useUserData } from '../../data/dataContext'
import { Post } from '../../data/posts'
import { useLoadElementById } from '../../components/hooks/useLoadElementById'
import { mapUndefined, nonUndefined } from '../../utils/undefined'
import { Feed } from '../../components/feed'
import { LoadableElement } from '../../components/loadableElement'
import { Container } from '@mui/material'
import { ProfileHeader } from '../../components/profileHeader'
import {Logout} from "../../components/login/logout";
import {useKeycloak} from "@react-keycloak/web";
import { useUserContext } from '../../components/contexts/userContext'
import { FollowActions } from '../../components/followActions'

type UserProfileParams = {
  userId: string
}

type UserProfileValue = {
    posts: Post[]
    user: string
    isFollowed: boolean
}

export const UserProfile = () => {
    const {keycloak, initialized} = useKeycloak();
    const user = useUserContext();
    const {userId} = useParams<UserProfileParams>() //agarra el id de la url
    const isSelf: boolean = user === userId;
    //chequear porque está comparando nombre de user con userId

  const postData = usePostData()
  const userData = useUserData()
    let posts = [];

  const getUserProfileValue = useCallback((id: string) => {
    /*return Promise.all([keycloak.tokenParsed?.preferred_username, postData.getPostsByUser(keycloak.tokenParsed?.preferred_username)])
      .then(([maybeUser, posts]) => mapUndefined(maybeUser, user => ({user, posts})))
*/
      return Promise.all([userData.getUserById(id), userData.isFollowed(id), postData.getPostsByUser(id)])
          .then(([maybeUser, isFollowed, posts]) =>
              mapUndefined(maybeUser, user => ({user, posts, isFollowed: nonUndefined(isFollowed, false)})),
          )

  }, [postData])

  //const {state} = useLoadElementById<UserProfileValue>(userId, getUserProfileValue)
    const {state, load} = useLoadElementById<UserProfileValue>(userId, getUserProfileValue)

    const handleFollowToggle = useCallback((userId: string) => {
        userData.toggleFollow(userId)
            .then(() => load())
    }, [userData, userId])


  const renderUserProfile = useCallback(({user, posts, isFollowed}: UserProfileValue) => (
    <Container>
        {/*chequear si va user o user.id como param en userId*/}
        <ProfileHeader
            user={user}
            actions={isSelf ? undefined : (
                <FollowActions userId={user} isFollowed={isFollowed} onToggle={handleFollowToggle}/>
            )}
        />
      <Feed posts={posts}/>
    </Container>
  ), [isSelf, handleFollowToggle])

  return (
    <MainFrame title="User profile">
      <LoadableElement state={state} renderValue={renderUserProfile}/>
      <Logout></Logout>
    </MainFrame>
  )
}