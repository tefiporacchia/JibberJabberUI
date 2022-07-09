
import { isNotUndefined, mapUndefined, nonUndefined } from '../../utils/undefined'
import {User, UserData} from "../users";
import {LocalDataStorage} from "../localStorage/localDataStorage";
import {getInfoById, getUserId, getToken} from "../../utils/keycloak";
import {useKeycloak} from "@react-keycloak/web";
import get = Reflect.get;
import axios from "axios";
import {getPostDesiredFields} from "../../utils/getPostDesiredFields";

export type UserWithFollow = User & {
    isFollowed?: boolean
}

const { keycloak, initialized } = useKeycloak();

export class apiUserData implements UserData {
    static type: string = 'user'

    constructor(
        private readonly data: LocalDataStorage<UserWithFollow>,
        private readonly currentUserId: string,
    ) {}

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
        const newUser = mapUndefined(
            this.data.getValue(this.currentUserId),
            user => ({...user, isFollowed: !nonUndefined(user.isFollowed, false)}),
        )
        if (isNotUndefined(newUser))
            this.data.setValue(newUser.id, newUser)

        return Promise.resolve(undefined)
    }

}

const userAxios = axios.create(
    {
        baseURL: "http://localhost:8081/follow",
        headers: {'Authorization': 'Bearer '+ getToken()}

    }
)