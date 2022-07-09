import axios from "axios"
import {FullPost, NewPost, Post, PostData} from "../posts";
import {getPostDesiredFields,getFullPostDesiredFields} from "../../utils/getPostDesiredFields";
import {getToken} from "../../utils/keycloak";
import keycloak from "../../Keycloak";

const postAxios = axios.create(
    {
        baseURL: "post/",
        headers: {'Authorization': 'Bearer '+ keycloak?.token}

    }
)
export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<Post> {
        const request = axios.create(
            {
                baseURL: "post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).post<NewPost, Post>("/", post)
        console.log(request);
        return request;
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {

        return postAxios.get(`/${id}`);
    }

    getFeedPosts(): Promise<Post[]> {
        console.log(keycloak?.token)
        return axios.create(
            {
                baseURL: "post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get("").then( result => {
            return getPostDesiredFields(result.data.content);

        });
    }//quedarme con los campos de user y message

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return postAxios.post<NewPost, FullPost>(`/${postId}/respond`, answer)
    }

    // @ts-ignore
    getPostsByUser(userId: string): Promise<Post[]> {
        postAxios.get(`/all/${userId}`).then( result => {

            return getPostDesiredFields(result.data);

        }, function(error) {
            console.log(error)
        });

    }

}


export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}