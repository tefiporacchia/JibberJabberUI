import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home/home'
import { PostPage } from '../pages/postPage/postPage'
import { UserProfile } from '../pages/userProfile/userProfile'
import PrivateRoute from '../helpers/PrivateRoute'
import {Login} from '../components/login/login'


export const MainRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/users/:userId" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
        <Route path="/posts/:postId" element={<PrivateRoute><PostPage/></PrivateRoute>}/>
        <Route path="/" element={<Login></Login>}/>
    </Routes>
  )
}