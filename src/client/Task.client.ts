import axios, {AxiosInstance} from "axios";
import {Task} from "../model/Task.ts";

export class TaskClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/task',
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    public async save(task: Task) : Promise<void> {
        try{
            return(await this.axiosClient.post(`/register`, task)).data
        }
        catch (error:any){
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Task[]> {
        try {
            return(await this.axiosClient.get<Task[]>(`/listall`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number) : Promise<Task> {
        try {
            return(await this.axiosClient.get<Task>(`/findbyid/${id}`)).data
        }
        catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(task: Task) : Promise<void> {
        try {
            return(await this.axiosClient.put(`/update/${task.id}`, task)).data
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