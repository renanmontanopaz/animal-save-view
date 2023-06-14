import axios, {AxiosInstance} from "axios";
import {Admin} from "@/model/Admin";
export class AdminClient {

    private axiosClient: AxiosInstance;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/admin',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    public async save(admin: Admin) : Promise<void> {
        try {
            return(await this.axiosClient.post(`/register`, admin)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll(): Promise<Admin[]> {
        try {
            return (await this.axiosClient.get<Admin[]>(`/listall`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number): Promise<Admin> {
        try {
            return (await this.axiosClient.get<Admin>(`/findbyid${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}