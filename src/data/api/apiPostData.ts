import axios from "axios"
import {FullPost, NewPost, Post, PostData} from "../posts";
import {getPostDesiredFields,getFullPostDesiredFields} from "../../utils/getPostDesiredFields";

export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<Post> {
        const request = postAxios.post<NewPost, Post>("/", post)
        console.log(request);
        return request;
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {

        return postAxios.get(`/${id}`);
    }

    getFeedPosts(): Promise<Post[]> {
        return postAxios.get("").then( result => {
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

const postAxios = axios.create(
    {
        baseURL: "http://localhost:8080/post"

    }
)

export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}