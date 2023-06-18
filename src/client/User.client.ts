import axios, {AxiosInstance} from "axios";
import {LoginUser} from "@/model/Login";
import {Token} from "@/model/Token";
export class UserClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/user',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }
// a client User precisa ser trabalhada nela, pois envolve autenticação
    public async login(login: LoginUser) : Promise<Token> {
        try{
            return(await this.axiosClient.post(`/login`, login)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

}