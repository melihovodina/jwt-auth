import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model";
import { config } from 'dotenv'
config({ path: '.env' })

const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || ''
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || ''

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, {expiresIn: '30d'}); 
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    }
}

export default new TokenService();