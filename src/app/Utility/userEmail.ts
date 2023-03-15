
import { Publishers } from "./__publisher";
import { user } from "./user";

export class userEmail {
    forEach(arg0: (element: any) => void) {
      throw new Error('Method not implemented.');
    }
    admin_id!: string;
    email_body!: string;
    flag!: string;
    publisher!: Publishers[];
    user!: user[];
    user_type!:string
    header!:string;
    constructor(_id:any,_flag:string){
      this.admin_id = _id;
      this.flag = _flag;
      this.email_body = '';
      this.user_type = '';
      this.header = '';
    }
}




