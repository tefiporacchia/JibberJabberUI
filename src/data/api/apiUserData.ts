import { UserData } from '../users'
import { LocalDataStorage } from '../localStorage/localDataStorage';
import { isNotUndefined, mapUndefined, nonUndefined } from '../../utils/undefined';
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";


export type UserWithFollow = string & {
    isFollowed?: boolean
}

export class ApiUserData implements UserData {
    static type: string = 'user'

    constructor(
        private readonly data: LocalDataStorage<UserWithFollow>,
        private readonly currentUserId: string,
    ) {}


    getCurrentUser(): Promise<string | undefined> {
        const { keycloak, initialized } = useKeycloak();
        //const userId = keycloak.subject;
        if(keycloak.tokenParsed.given_name)
        return Promise.resolve(keycloak.tokenParsed.given_name);
        /*console.log(this.currentUserId)
        console.log(this.data.getValue(this.currentUserId))*/
        //en vez de devolver solo el current user, que es un string, devolver un nuevo obj UserWithFollow
        //creado con ese string + si es seguido o no por el usuario en cuestion.
        // return Promise.resolve(this.data.getValue(this.currentUserId))


    }

    getUserById(userId: string): Promise<UserWithFollow | undefined> {
        const { keycloak, initialized } = useKeycloak();
        const user = keycloak.

    }

    /*searchUser(searchString: string): Promise<string[]> {
      const result = this.data.getAllByPredicate(user =>
        user.includes(searchString) || user.includes(searchString),
      )

      return Promise.resolve(result)
    }*/

    isFollowed(userId: string): Promise<boolean | undefined> {
        const result = mapUndefined(this.data.getValue(this.currentUserId), user => user?.isFollowed)
        return Promise.resolve(result)
    }

    toggleFollow(userId: string): Promise<void> {

        const newUser = mapUndefined(
            this.data.getValue(this.currentUserId),
            user => ({...user, isFollowed: !nonUndefined(user.isFollowed, false)}),
        ) //SPREAD OP ERROR

        if (isNotUndefined(newUser)){
            this.data.setValue(newUser.id, newUser)
        }

        return Promise.resolve(undefined)
    }


}
const followAxios = axios.create(
    {
        baseURL: "http://localhost:8080/follow"

    }
)