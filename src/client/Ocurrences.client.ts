import axios, {AxiosInstance} from "axios";
import {Occurrences} from "@/model/Occurrences";

export class OcurrencesClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/occurrences',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    public async save(occurrences: Occurrences) : Promise<void> {
        try{
            return(await this.axiosClient.post(`/register`, occurrences)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Occurrences[]> {
        try {
            return(await this.axiosClient.get<Occurrences[]>(`/listall`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number) : Promise<Occurrences> {
        try {
            return(await this.axiosClient.get<Occurrences>(`/findbyid/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(occurrences: Occurrences) : Promise<void> {
        try {
            return(await this.axiosClient.put(`/update/${occurrences.id}`, occurrences)).data
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