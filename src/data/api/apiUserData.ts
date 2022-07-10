import {User, UserData} from "../users";
import {getInfoById, getUserId, getToken} from "../../utils/keycloak";

import axios from "axios";
import keycloak from "../../Keycloak";

const userAxios = axios.create(
    {
        baseURL: "follow/",
        headers: {'Authorization': 'Bearer '+ getToken()}

    }
)

export class ApiUserData implements UserData {


    getCurrentUser(): Promise<User | undefined> {
        const result = <User>{id:getUserId(), name:keycloak.tokenParsed?.given_name, username:keycloak.tokenParsed?.preferred_username};
        return Promise.resolve(result)
    }

    getUserById(userId: string): Promise<User | undefined> {
        return getInfoById(userId).then( data => {
            return <User>{id: userId, name: data.data.given_name, username:data.data.preferred_username}

        });
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        const result = userAxios.get(`/all/${getUserId()}`).then( result => {
            const r = result.data;
            let j = 0;
            for (let i = 0; i < result.data.length; i++) {
                if(result.data[i].follower== keycloak.subject && result.data[i].followed== userId ){
                    j++;
                }
            }
            return j>1;
        });
        return Promise.resolve(result)
    }

    toggleFollow(userId: string): Promise<void> {
        return this.isFollowed(userId).then(followed => {
            if (followed) {
                return userAxios.delete(`/${userId}`)
            } else {
                return userAxios.post(`/${userId}`)
            }
        })
    }

}

