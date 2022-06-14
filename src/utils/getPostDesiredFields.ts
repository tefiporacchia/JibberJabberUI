import {Post,FullPost} from "../data/posts";

export const getPostDesiredFields = (objArray: any[]) : Post[]=>{
   return objArray?.map(({user,message,id})=>(<Post>{user:user, text:message, id: id}));

}

export const getFullPostDesiredFields = (objArray: any[]) : FullPost[]=>{
   return objArray?.map(({user,message,id,responses})=>(<FullPost>{user:user, text:message, id: id, thread:responses}));

}