import {Post,FullPost} from "../data/posts";
import {useUserData} from "../data/dataContext";

export const getPostDesiredFields = (objArray: any[]) : Promise<Post[]>=>{
   return Promise.all(objArray?.map(async ({user,message,id})=>{
      const userData = useUserData();
      const u = await userData.getUserById(user);
      return <Post>{user:u, text:message, id: id}
   }));
}

export const getFullPostDesiredFields = (objArray: any[]) : FullPost[]=>{
   return objArray?.map(({user,message,id,responses})=>(<FullPost>{user:user, text:message, id: id, thread:responses}));

}