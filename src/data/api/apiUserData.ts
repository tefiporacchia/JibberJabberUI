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
                headers: {'Authorization': 'Bearer '+ "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBWkp5RUlVa1pmWWNtTFpKLS0tcWFnS0RoYlhuWFBMMjY3ak1XcnZiU0hFIn0.eyJleHAiOjE2NTc1OTQ3MjIsImlhdCI6MTY1NzU5NDQyMiwianRpIjoiNGFkZjY1ZjgtZjEzNi00ZmM0LTk3ODItMTkxM2YyOWNjYTgwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9hdXRoL3JlYWxtcy9KaWJiZXJKYWJiZXIiLCJzdWIiOiJmYmU1Mjk1OS1mOWY2LTQ5NzEtOGQ3YS1hZjljZDhiZDlhYTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiNTExMDkwYjYtZDY4NS00N2UwLWE3NjEtMmJiYzAwMDY5YzFmIiwiYWNyIjoiMSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjUxMTA5MGI2LWQ2ODUtNDdlMC1hNzYxLTJiYmMwMDA2OWMxZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlNvbmlhIFdlbHMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzb25pYSIsImdpdmVuX25hbWUiOiJTb25pYSIsImZhbWlseV9uYW1lIjoiV2VscyJ9.WO4eYuriDS-Pj1shyn6gwYHniNHTw1LLiyhI3gO8xc3UMrYos8AHnlgRZ8fyw1fckcp1JOg1frMjbOk5Lp9ynwMEx0t4YxI6-2zUMWy0h43N13n-WqqM8mLGaxwgJZIcSQeRMe7cClPL9-jYvmUcwHWSZtag8IggqzZ6JwRGjseED8rWbhgGiB4haW7ejo4TBnpf8lI5AHFHM6Jitc_krRwEr1GIDBYTaxzmNHGbjwJqfVU4wE07Iu6gawhA6rx3Go0OyxN0CS5bl9uXI7eYclg0CupPQAynVna81YiFSveqGDtqN_on2NkpPMEFDp0g_g-2l-p2CwHlTwR_r8PHjw"}

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

    /*async getA(): Promise<User | undefined> {
        const a = await keycloak.tokenParsed?.preferred_username
        console.log(a)
        const result = <User>{
            id: getUserId(),
            name: keycloak.tokenParsed?.given_name,
            username: keycloak.tokenParsed?.preferred_username
        };
        return Promise.resolve(result)
    }*/

    getUserById(userId: string): Promise<User | undefined> {

        return axios.create(
            {
                baseURL: "/user/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get(`${userId}`).then( result => {
            console.log(result)
            return result.data;

        });

        /*return getInfoById(userId).then( data => {
            return <User>{id: userId, name: data.data.given_name, username:data.data.preferred_username}

        });*/
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
        console.log(userId,getUserId())
        return axios.create(
            {
                baseURL: "/follow/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get(`/all/b1e1a146-6bfa-4896-aa56-cdb43f9ed01b`).then( result => {
            const r = result.data;
            if(userId=="b1e1a146-6bfa-4896-aa56-cdb43f9ed01b"){
                return true;
            }
            for (let i = 0; i < r.length; i++) {
                if(r[i].followed== userId ){
                    return true;
                }
            }
            return false;
        });

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

