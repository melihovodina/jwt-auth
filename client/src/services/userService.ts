import { AxiosResponse } from "axios";
import api from "../api/api";
import { iUser } from "../redux/models/iUser";

export default class userService {
  static async fetchUsers(): Promise<AxiosResponse<iUser[]>> {
    return api.get<iUser[]>('/users')
  }
}