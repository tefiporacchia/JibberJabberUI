import {User, UserData} from "../users";
import {getInfoById, getUserId, getToken} from "../../utils/keycloak";
import axios from "axios";
import keycloak from "../../Keycloak";
import {getPostDesiredFields} from "../../utils/getPostDesiredFields";

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
            console.log(keycloak.tokenParsed)
        }, 5000)*//*

        return Promise.resolve(<User>{})*/

        /*return new Promise( (resolve) => {
            setTimeout(() => resolve(
            this.getCurrUs()
        ), 2000) } )*/


        //return Promise.resolve(<User>{id: "a2be8e89-c280-4309-b4c9-20fd08519486", name: "Stefania", username:"tefi"})

        return axios.create(
            {
                baseURL: "/user/",
                headers: {'Authorization': 'Bearer '+ "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBWkp5RUlVa1pmWWNtTFpKLS0tcWFnS0RoYlhuWFBMMjY3ak1XcnZiU0hFIn0.eyJleHAiOjE2NTc1ODQ5NzUsImlhdCI6MTY1NzU4NDY3NSwianRpIjoiYmUxMGM0MWMtZmZmYS00MDg4LWI0ZTctMjg5NmM3MzE3NzA5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9hdXRoL3JlYWxtcy9KaWJiZXJKYWJiZXIiLCJzdWIiOiJhMmJlOGU4OS1jMjgwLTQzMDktYjRjOS0yMGZkMDg1MTk0ODYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiYTFkMTUwNWMtNWRkZC00YWQyLTk1NjMtYTQyNjQzMzI1YTY5IiwiYWNyIjoiMSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImExZDE1MDVjLTVkZGQtNGFkMi05NTYzLWE0MjY0MzMyNWE2OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlN0ZWZhbmlhIFBvcmFjY2hpYSIsInByZWZlcnJlZF91c2VybmFtZSI6InRlZmkiLCJnaXZlbl9uYW1lIjoiU3RlZmFuaWEiLCJmYW1pbHlfbmFtZSI6IlBvcmFjY2hpYSJ9.gah6VJIOERuz5DLpgmyBT6UxTeuq1NFhOhz25gBRHJ_d_0TpJDgWqHrcgW-6uyLWCM46by6yg5A4v4O_7KCMrubWU3GTDdXQl1imgeUsZmX0Q5kjenPIpW19f7q_UE4IynQNnIUGMfI_ZwNIPv78d6KqbKlu1b8h_0Hk4jgXHMklgwdr-dZuYirjWPeVbDp1Zyt39Pqw_Kge49gnCh6gm1MLUZUnaNLHxVvBEbWHHZxsDOcdvnsiV0JRF74y1ZKTW3IEublDVSN_HY3r_Tu0VpYv0A6BA1SVTUMDi2Vssjir8YQFN1jqkobLqr0-VLDCao4LmNErxZ_t3kgN8iLQKQ"}

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

    async getA(): Promise<User | undefined> {
        const a = await keycloak.tokenParsed?.preferred_username
        console.log(a)
        const result = <User>{
            id: getUserId(),
            name: keycloak.tokenParsed?.given_name,
            username: keycloak.tokenParsed?.preferred_username
        };
        return Promise.resolve(result)
    }

    getUserById(userId: string): Promise<User | undefined> {
        return getInfoById(userId).then( data => {
            return <User>{id: userId, name: data.data.given_name, username:data.data.preferred_username}

        });
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        const result = followAxios.get(`/all/${getUserId()}`).then( result => {
            const r = result.data;

            for (let i = 0; i < r.length; i++) {
                if(r[i].followed== userId ){
                    return true;
                }
            }
            return false;
        });
        return Promise.resolve(result)
    }

    toggleFollow(userId: string): Promise<void> {
        return this.isFollowed(userId).then(followed => {
            if (followed) {
                return followAxios.delete(`/${userId}`)
            } else {
                return followAxios.post(`/${userId}`)
            }
        })
    }

}

