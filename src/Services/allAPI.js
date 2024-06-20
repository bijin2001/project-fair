import commonAPI from "./commonAPI";
import SERVER_URL from "./serverurl";

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/project/add`,reqBody,reqHeader)
}

export const homeProjectAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/project/get-home`,"")
}

export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

export const allProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

export const updateProjectAPI = async (pid, reqBody, reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/${pid}/edit`,reqBody,reqHeader)
}

export const removeProjectAPI = async (pid, reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/${pid}/remove`,{},reqHeader)
}

export const editUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}