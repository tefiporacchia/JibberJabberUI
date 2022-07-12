import {Post,FullPost} from "../data/posts";
import {useUserData} from "../data/dataContext";

export const getPostDesiredFields = async(objArray: any[]) : Promise<Post[]>=>{
   return Promise.all(objArray?.map(async ({user,message,id})=>{
     /* const userData = useUserData();
      const u = await userData.getUserById(user);*/
      return <Post>{user:{id: "a2be8e89-c280-4309-b4c9-20fd08519486", name: "Stefania", username:"tefi"}, message:message, id: id}
   }));
}

export const getFullPostDesiredFields = (objArray: any[]) : FullPost[]=>{
   return objArray?.map(({user,message,id,responses})=>(<FullPost>{user:user, message:message, id: id, responses:responses}));

}