import { iUser } from "../iUser";

export interface authResponse {
    accessToken: string;
    refreshToken: string;
    user: iUser
}