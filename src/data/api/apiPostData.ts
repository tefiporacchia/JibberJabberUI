import axios from "axios"
import {FullPost, NewPost, Post, PostData, PostToSend} from "../posts";
import {getPostDesiredFields,getFullPostDesiredFields} from "../../utils/getPostDesiredFields";
import {getToken} from "../../utils/keycloak";
import keycloak from "../../Keycloak";

const postAxios = axios.create(
    {
        baseURL: "/post/",
        headers: {'Authorization': 'Bearer '+ keycloak?.token}

    }
)
export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<PostToSend> {
        console.log(post)
        const request = axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).post<NewPost,PostToSend>("/", {text: post.message,user:post.user.username})
        console.log(request);
        return request;
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get(`/${id}`).then( result => {
            console.log(result)
            //return getPostDesiredFields(result.data.content);
            return result.data.content;

        });
    }

    getFeedPosts(): Promise<Post[]> {
        console.log(keycloak?.token)
        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get("").then( result => {
                console.log(result)
            //return getPostDesiredFields(result.data.content);
            return result.data.content;

        });
    }//quedarme con los campos de user y message

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return postAxios.post<NewPost, FullPost>(`/${postId}/respond`, answer)
    }

    // @ts-ignore
    getPostsByUser(userId: string): Promise<Post[]> {

        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': 'Bearer '+ keycloak?.token}

            }).get(`/all/${userId}`).then( result => {
            console.log(result)
            //return getPostDesiredFields(result.data.content);
            return result.data.content;

        });



        /*postAxios.get(`/all/${userId}`).then( result => {

            return getPostDesiredFields(result.data);

        }, function(error) {
            console.log(error)
        });*/

    }

}


export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}