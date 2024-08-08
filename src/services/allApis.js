
import { base_url } from "../base_Url"
import { commonApi } from "./commonApi"


// add task

export const addTaskApi=async(bodyData)=>{
    return await commonApi('POST',`${base_url}/api/Task`,bodyData)
}

//get task
export const getTaskApi=async(searchData)=>{
    return await commonApi('GET',`${base_url}/api/Tasks?search=${searchData}`,"")
}

//get single task by id
export const singleTaskApi=async(id)=>{
    return await commonApi('GET',`${base_url}/api/Task/${id}`,"")
    }


    //update single task
    export const UpdateTaskApi = async (id, bodyData) => {
        
        return await commonApi('PUT', `${base_url}/api/update/Task/${id}`, bodyData)
      }    

//dlt task
export const delTaskApi=async(id)=>{
    return await commonApi('DELETE',`${base_url}/api/delete/Task/${id}`)
    }
    


//-----------------------------------------------------------------------------------------------------


 //Apis for task with image   


//add taskwithImageurl
export const addWITaskApi=async(bodyData)=>{
    return await commonApi('POST',`${base_url}/api/ImgTask`,bodyData)
}

//get tasks with ImgUrl
export const getWITaskApi=async(searchData)=>{
    return await commonApi('GET',`${base_url}/api/ImgTasks?search=${searchData}`,"")
}

//get single task with img by id
export const singleWITaskApi=async(id)=>{
    return await commonApi('GET',`${base_url}/api/ImgTask/${id}`,"")
    }
//update single task with img
 export const UpdateWITaskApi = async (id, bodyData) => {
        
     return await commonApi('PUT', `${base_url}/api/update/ImgTask/${id}`, bodyData)
      }    


//dlt task
export const delWITaskApi=async(id)=>{
    return await commonApi('DELETE',`${base_url}/api/delete/ImgTask/${id}`,"")
    }
    
