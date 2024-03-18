export interface UserPost{
    name?:string,
    email?:string,
    password?:string,
  }
  
  export interface User{
    id: string,
    name?:string,
    email?:string,
    password?:string,
  }

  export interface InputFileData { 
    id?:string;  
    name?: string;
    type?: string;
    content?:string;
    downloadSrc?:string;
    path?:string;
    userId:string;
    isDeleted?:boolean;
    isSync?:boolean;
    uploadDate?: Date;
    updateDate?:Date; 
  }

  export interface PostNotification {
    id?: string,
    message: string,
    updateDate:Date,
    fileId?: string,
    userId: string,
    senderName?: string,
  }