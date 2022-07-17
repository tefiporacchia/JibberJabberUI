import {User, UserData} from "../users";
import {getInfoById, getUserId, getToken} from "../../utils/keycloak";
import axios from "axios";
import keycloak from "../../keycloak";
import {getPostDesiredFields} from "../../utils/getPostDesiredFields";
import {NewPost, PostToSend} from "../posts";

const followAxios = axios.create(
    {
        baseURL: "follow/",
        headers: {'Authorization': 'Bearer '+ getToken()}

    }
)

const userAxios = axios.create(
    {
        baseURL: "user/",
        headers: {'Authorization': 'Bearer '+ getToken()}

    }
)

/*const getCurrUs= (): User => {
    let id
    let givenName
    let username
    let result
    console.log("aaaa")
    id=keycloak?.subject
    givenName=keycloak.tokenParsed?.given_name
    username=keycloak.tokenParsed?.username
    debugger
    result = <User>{id:id, name:givenName, username:username};
    return result;
}*/

export class ApiUserData implements UserData {


    getCurrentUser(): Promise<User | undefined> {


        /*setTimeout(() => {
            return axios.create(
                {
                    baseURL: "/user/",
                    headers: {'Authorization': 'Bearer '+ keycloak?.tokenParsed}

                }).get("").then( result => {
                console.log(result)
                return result.data;

            });
        }, 5000)*/

       /* return Promise.resolve(<User>{})*!/*/

        /*return new Promise( (resolve) => {
            setTimeout(() => resolve(
            this.getCurrUs()
        ), 2000) } )*/


        //return Promise.resolve(<User>{id: "a2be8e89-c280-4309-b4c9-20fd08519486", name: "Stefania", username:"tefi"})


        return axios.create(
            {
                baseURL: "/user/",
                headers: {'Authorization': 'Bearer '+ keycloak.token}

            }).get("").then( result => {
            console.log(result)
            return result.data;

        });



    }
    async getCurrUs(): Promise<User> {
        const token = await keycloak?.tokenParsed
        debugger
        return <User>{id:token?.sub, name:token?.given_name, username:token?.preferred_username};
    }


    getUserById(userId: string): Promise<User | undefined> {

        return axios.create(
            {
                baseURL: "/user/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get(`${userId}`).then( result => {
            console.log(result)
            return result.data;

        });

    }

    isFollowed(userId: string): Promise<boolean | undefined> {
       /* const result = followAxios.get(`/all/${getUserId()}`).then( result => {
            const r = result.data;

            for (let i = 0; i < r.length; i++) {
                if(r[i].followed== userId ){
                    return true;
                }
            }
            return false;
        });*/
        /*return Promise.resolve(result)*/

        return this.getCurrentUser().then(user => {
            return axios.create(
                {
                    baseURL: "/follow/",
                    headers: {'Authorization': 'Bearer '+ keycloak?.token}

                }).get(`/all/${user?.id}`).then( result => {
                const r = result.data;
                if(userId==user?.id){
                    return true;
                }
                for (let i = 0; i < r.length; i++) {
                    if(r[i].followed== userId ){
                        return true;
                    }
                }
                return false;
            });
        })



    }

    toggleFollow(userId: string): Promise<void> {

        return this.getCurrentUser().then(user => {

            return this.isFollowed(userId).then(followed => {
                if (followed) {
                    return axios.create(
                        {
                            baseURL: "/follow/",
                            headers: {'Authorization': 'Bearer '+ keycloak?.token}

                        }).delete(`/unfollow/${user?.id}/${userId}`)
                } else {
                    return axios.create(
                        {
                            baseURL: "/follow/",
                            headers: {'Authorization': 'Bearer '+ keycloak?.token}

                        }).post("/", {follower:user?.id, followed:userId})
                }
            })

        })


    }

}

