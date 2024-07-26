import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model";
import { config } from 'dotenv'
config({ path: '.env' })

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || ''
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || ''

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: '30d'}); 
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