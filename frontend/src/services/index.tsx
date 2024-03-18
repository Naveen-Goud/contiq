import API from "./API";
import { InputFileData, User, UserPost, PostNotification } from "../modal/Interfaces";

const BearerToken = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
};

export const getMyData=async(email:string)=>{
      return await API.get('/users/', {
        params: {
          email: email,
        },
      }); 
};
export const postMyData = async (data: UserPost) => {
    return await API.post(`/users/save/`, data);
  };

export const getUserByEmailId=async(email:string)=>{
    return await API.get(`/users/`,{
        params:{
            email:email
        }
    });
};

export const updatePassword = async (user: User) => {

  try {
    return await API.put(`/users/${user.id}`, {
      ...user
    });
  } catch (error) {
    console.error('Error updating password:', error);
  }

}

export const getFileLists=async( userId: string )=>{
 
  try{ 
    return await API.get(`/files/user/${userId}`, BearerToken);
      
  } catch (error) {
    console.error('Error fetching file:', error);
  //  throw error;
}
 
}

export const  SearchFilesByKeyword=async( keyword: any )=>{ 
  try{ 
    return await API.get(`/files/search/`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params:{
        keyword:keyword
      },
  });
  } catch (error) {
    console.error('Error fetching file:', error);
  //  throw error;
  }
  }
 
export const  getFileResource=async( filePath: string )=>{ 
  try { 
    const response = await API.get(`/files/resource?filePath=${filePath}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    }); 
     
    return response  ;
 
} catch (error) {
    console.error('Error fetching file:', error);
    throw error;
}
} 

export const postFileData = async (data:File,userId: string ) => {
  try {
    const formData = new FormData();
    formData.append('file', data);

    const response = await API.post(`/files/upload/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }); 
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
 
export const deleteFileById = async (fileId:string) => {
  try {
    const response = await API.delete(`/files/delete/${fileId}`, BearerToken);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting file with ID ${fileId}:`, error);
    throw error;  
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const response = await API.delete(`/files/delete/${fileId}`, BearerToken);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}
 
export const updateFileOnServer = async (fileData: File,userId :string) => {
  try {
    const response = await API.put(`/files/upload/${userId}`, fileData, BearerToken);

    if (response.status === 200) {
      console.log(`File "${fileData.name}" updated successfully.`);
      return true;
    } else {
      console.error(`Error updating file "${fileData.name}": Unexpected response status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating file "${fileData.name}":`, error);
    return false;
  } 
};

export const listNotifications = async () => {

  try{
    return await API.get(`/api/notifications/`, BearerToken);
  }catch (error){
    console.error(`Unable to fetch notification list: `, error);
    throw error;
  }
};
 
export const countNotificationByUserId = async (userId: string) => {

  try{
    return await API.get(`/api/notificationStatus/user/${userId}`, BearerToken);
  }catch (error){
    throw error;
  }
};

export const updateNotificationStatus = async (userId: string) => {

  try{
    return await API.put(`/api/notificationStatus/user/${userId}`, null, BearerToken);
  }catch (error){
    throw error;
  }
};

export const postNotification = async (notification: PostNotification) => {
  try {
    return await API.post(`/api/notifications/`, notification, BearerToken);
  }catch(error){
    throw error;
  }
}

 
export const getToken = async (data: any) => {
  const response = await API.post("/users/login/", data);
  return response.data;
};



export const postGoogleDriveFile = async (userId: string,fileId:string ) => {
  try { 
    const response =  await  API.post(`/files/googleDrive?userId=${userId}&fileId=${fileId}`,null,BearerToken); 
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};