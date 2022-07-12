import {User, UserData} from "../users";
import {getInfoById, getUserId, getToken} from "../../utils/keycloak";
import axios from "axios";
import keycloak from "../../Keycloak";
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
                headers: {'Authorization': 'Bearer '+ "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBWkp5RUlVa1pmWWNtTFpKLS0tcWFnS0RoYlhuWFBMMjY3ak1XcnZiU0hFIn0.eyJleHAiOjE2NTc1OTU2MzAsImlhdCI6MTY1NzU5NTMzMCwianRpIjoiM2JkYTBmM2EtYTRkYy00MGRiLWJjMTctNjRkNTIyMWZhMTY4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9hdXRoL3JlYWxtcy9KaWJiZXJKYWJiZXIiLCJzdWIiOiJmYmU1Mjk1OS1mOWY2LTQ5NzEtOGQ3YS1hZjljZDhiZDlhYTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiYmZmZjY3NTMtN2UwMC00MzQ5LWEwZmMtNWNhM2FmNWY0NzczIiwiYWNyIjoiMSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImJmZmY2NzUzLTdlMDAtNDM0OS1hMGZjLTVjYTNhZjVmNDc3MyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlNvbmlhIFdlbHMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzb25pYSIsImdpdmVuX25hbWUiOiJTb25pYSIsImZhbWlseV9uYW1lIjoiV2VscyJ9.ZxnXXCQ82otfTQoUUSzIJWWcILLfoIrq5Vnz4GkLo-VQt__tzFu2DA_zRSPTeTMLClKuIB95QX5kEManCDy7dM77sapDGY6x0Db6OCL-il6PZ7gDeZs1Y2EFifpg2TLgKwrhFYU3evrXnJj0gZ5OqPlNyZj72cGeFp_Y2Jk_41PAa7YbLx9jmTx9-Ct1QsD9AM_w5m5rHzNu8Sn2YoxYn2GP4jLX_dzY_agGXkTGLTSN74F8JXSDtCHrhc4_kDogD4mfmFlJ_DDvV5wp-JTKbWw7zjBbntWfv53XS67oS3TjI_sJrBFAQK6WrCuvLT6qogKaIhRp4hsLqLWJR7y2GQ"}

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

