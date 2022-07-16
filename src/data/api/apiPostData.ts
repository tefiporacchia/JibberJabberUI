import axios from "axios"
import {FullPost, NewPost, Post, PostData, PostToSend} from "../posts";
import keycloak from "../../Keycloak";
import UserService from "../../utils/userService";

const postAxios = axios.create(
    {
        baseURL: "/post/",
        headers: {'Authorization': 'Bearer '+ keycloak?.token}

    }
)
export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<PostToSend> {
        const request = axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}

            }).post<NewPost,PostToSend>("/", {text: post.message,user:post.user.username})
        return request;
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}
            }).get(`/${id}`).then( result => {
                console.log(result.data);
            return result.data;

        });
    }

    getFeedPosts(): Promise<Post[]> {
        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}

            }).get("").then( result => {
            return result.data.content;

        });
    }

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        console.log(answer);

        const request = axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}

            }).patch<NewPost, FullPost>(`/${postId}/respond`, { text: answer.message })
        console.log(request);
        return request;

    }

    // @ts-ignore
    getPostsByUser(userId: string): Promise<Post[]> {

        return axios.create(
            {
                baseURL: "/post/",
                headers: {'Authorization': `Bearer ${UserService.getToken()}`}

            }).get(`/all/${userId}`).then( result => {
            return result.data.content;

        });

    }

}


export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}