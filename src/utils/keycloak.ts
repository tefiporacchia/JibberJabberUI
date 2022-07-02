import {FullPost, Post} from "../data/posts";
import axios from "axios";
import {User} from "../data/users";
import {useKeycloak} from "@react-keycloak/web";

const { keycloak, initialized } = useKeycloak();

export const getInfoById = async (id: string) =>{
    return userAxios.get(`/${id}`);
}

export const getAllUsers = async () =>{
    return userAxios.get(`/`);
}

export const getUserId = () =>{

    return keycloak.subject;
}

export const getToken = () =>{

    return keycloak.token;
}

const userAxios = axios.create(
    {
        baseURL: "http://localhost:8082/auth/admin/realms/JibberJabber/users",
        headers: {'Authorization': 'Bearer '+ getToken()}
    }
)