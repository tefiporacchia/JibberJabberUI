import {User, UserData} from "../users";
import axios from "axios";
import UserService from "../../utils/userService";


export class UserApi implements UserData {
    getCurrentUser(): Promise<User | undefined> {
        return axios.create(
            {
                baseURL: "https://jibberjabberdev.ml/user/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}
            }).get("").then( result => {
            console.log(result)
            return result.data;

        });
    }

    getUserById(userId: string): Promise<User | undefined> {
        return axios.create(
            {
                baseURL: "https://jibberjabberdev.ml/user/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}

            }).get(`${userId}`).then( result => {
            console.log(result)
            return result.data;
        });
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        return this.getCurrentUser().then(user => {
            return axios.create(
                {
                    baseURL: "https://jibberjabberdev.ml/follow/",
                    headers: {'Authorization': `Bearer ${UserService.getToken()}`}

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
                            baseURL: "https://jibberjabberdev.ml/follow/",
                            headers: {'Authorization': `Bearer ${UserService.getToken()}`}

                        }).delete(`/unfollow/${user?.id}/${userId}`)
                } else {
                    return axios.create(
                        {
                            baseURL: "/follow/",
                            headers: {'Authorization': `Bearer ${UserService.getToken()}`}

                        }).post("/", {follower:user?.id, followed:userId})
                }
            })

        })
    }
}


