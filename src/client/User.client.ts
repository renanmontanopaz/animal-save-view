import axios, {AxiosInstance} from "axios";
import {LoginUser} from "@/model/Login";
import {Token} from "@/model/Token";
import { User } from "@/model/User";
import { Associate } from "@/model/Associate";
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

    public async findById(id: number) : Promise<User> {
        try {
            return(await this.axiosClient.get<User>(`/findbyid/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findAssociateByIdUser(id: number) : Promise<Associate> {
        try {
            return(await this.axiosClient.get(`/findAssociateByIdUser/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

}