import { AxiosResponse } from "axios";
import api from "../api/api";
import { authResponse } from "../redux/models/reponse/authResponse";

export default class authService {
    static async login(email: string, password: string): Promise<AxiosResponse<authResponse>> {
        return api.post<authResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<authResponse>> {
        return api.post<authResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return api.post('/logout')
    }    
}