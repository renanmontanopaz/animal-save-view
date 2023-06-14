import axios, {AxiosInstance} from "axios";
import {User} from "@/model/User";
export class UserClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/user',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }
// a client User precisa ser trabalhada nela, pois envolve autenticação
    public async login(user: User) : Promise<void> {
        try{
            return(await this.axiosClient.post(`/login`, user)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

}