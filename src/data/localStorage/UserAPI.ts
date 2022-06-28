import {User, UserData} from "../users";
import keycloak from "../../Keycloak";
import {Javascript} from "@mui/icons-material";
import {tablePaginationClasses} from "@mui/material";
import {isDOMComponent} from "react-dom/test-utils";

const apiURL = "http://localhost:8080/follows"


class UserAPI implements UserData {

    getCurrentUser(): Promise<User | undefined> {

        const u = sessionStorage.getItem("user")

        if(u) return Promise.resolve(JSON.parse(u))

        const sessionToken = sessionStorage.getItem("tokenParsed")

        if(sessionToken) {

            const t = JSON.parse(sessionToken)

            const user : User = {

                id: t.sub,
                displayName: t.given_name + " " + t.family_name,
                username: t.preferred_username

            }

            sessionStorage.setItem("user", JSON.stringify(user))

            return Promise.resolve(user);

        }

        const kc = keycloak.tokenParsed

        if(kc?.sub) {

            const user : User = {

                id: kc.sub,
                displayName: kc?.given_name + " " + kc?.family_name,
                username: kc?.preferred_username

            }

            sessionStorage.setItem("user", JSON.stringify(user))


            return Promise.resolve(user);

        }

        return Promise.resolve(undefined)

    }

    getUserById(userId: string): Promise<User | undefined> {

        //userId es subject
        //el token lo puedo conseguir con keycloak.token en vez de lo que hace von

        let token

        if(keycloak.token) token = keycloak.token
        else if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")

        try {

            return fetch(`http://localhost:8087/auth/admin/realms/JibberJabber/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            }).then(r => r.json())
                .then(data => {


                    return {
                        id: data.id,
                        displayName: data.firstName + " " + data.lastName,
                        username: data.username
                    }})

        } catch(err) {
            console.log(err)

            return this.getCurrentUser()
        }



    }

    isFollowed(userId: string): Promise<boolean | undefined> {

        const u = sessionStorage.getItem("user")

        return fetch(`${apiURL}/getFollowers/${userId}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => res.json()).then(data => {

            for (let i = 0; i < data.content.length; i++) {
                if(u && data.content[i] === JSON.parse(u).id) return true
            }

            return false

            // if(u) {
            //
            //     data.content.forEach((f: string) => {
            //
            //         console.log(f)
            //         console.log(JSON.parse(u).id)
            //         console.log(f === JSON.parse(u).id)
            //
            //         if (f === JSON.parse(u).id) return Promise.resolve(true)
            //
            //     })
            //
            //     return Promise.resolve(false)
            //
            // } else return Promise.resolve(false)

        })
    }



        // return Promise.resolve(true)


        // const u = sessionStorage.getItem("user")
        //
        // return fetch(`${apiURL}/getIsFollowing`, {
        //     method: 'GET',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     body: JSON.stringify({
        //         followerUserId: u? JSON.parse(u).userId : "",
        //         followedUserId: userId
        //     }
        //     )
        // }).then(r => r.json()).then(data => {
        //     console.log(data)
        //     return data
        // })


    toggleFollow(userId: string, isFollowed: boolean): Promise<void> {

        const u = sessionStorage.getItem("user")

        const kc = keycloak.tokenParsed

        let uID

        if(kc?.sub) uID = kc.sub
        else if(u) uID = JSON.parse(u).id

        const requestURL = isFollowed ? 'unfollowUser' : 'followUser'


        // return fetch(`${apiURL}/${requestURL}`, {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     body: JSON.stringify({
        //         followerUserId: userId,
        //         followedUserId: u? JSON.parse(u).id : ""
        //     })
        // }).then(r => r.json()).then(data => data.content)


        return fetch(`${apiURL}/toggleFollow`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                followerUserId: uID,
                followedUserId: userId
            })
        }).then(r => r.json())

    }

    getFollowing(id: string): Promise<string[]> {

        return fetch(`${apiURL}/getFollowing/${id}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => res.json()).then(data => data.userId)

    }


}

export const userAPI = new UserAPI()