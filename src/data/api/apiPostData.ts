import axios from "axios"
import {FullPost, NewPost, Post, PostData} from "../posts";

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
        return Promise.resolve([]);
    }

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return postAxios.post<NewPost, FullPost>(`/${postId}/respond`, answer)
    }

    getPostsByUser(userId: string): Promise<Post[]> {
        return Promise.resolve([]);
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