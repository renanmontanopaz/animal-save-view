import axios, {AxiosInstance} from "axios";
import {Provider} from "@/model/Provider";

export class ProviderClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/provider',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    public async save(provider: Provider) : Promise<void> {
        try{
            return(await this.axiosClient.post(`/register`, provider)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Provider[]> {
        try {
            return(await this.axiosClient.get<Provider[]>(`/listall`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number) : Promise<Provider> {
        try {
            return(await this.axiosClient.get<Provider>(`/findbyid/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(provider: Provider) : Promise<void> {
        try {
            return(await this.axiosClient.put(`/update/${provider.id}`, provider)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(id: number) : Promise<void> {
        try {
            return(await this.axiosClient.put(`/disable/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}