import { ILogin } from "../../interface/IAuth"
import { API } from "./api.middleware"

export const loginAPI = async (data:ILogin) => {
    return await API({
        url : '/login' ,
        method : 'POST',
        data
    }).then( res => res.data )
}