import axios, {AxiosInstance} from "axios";
import {Associate} from "../model/Associate.ts";

export class AssociateClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/associate',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    public async save(associate: Associate) : Promise<void> {
        try{
            return(await this.axiosClient.post(`/register`, associate)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Associate[]> {
        try {
            return(await this.axiosClient.get<Associate[]>(`/listall`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number) : Promise<Associate> {
        try {
            return(await this.axiosClient.get<Associate>(`/findbyid/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(associate: Associate) : Promise<void> {
        try {
            return(await this.axiosClient.put(`/update/${associate.id}`, associate)).data
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