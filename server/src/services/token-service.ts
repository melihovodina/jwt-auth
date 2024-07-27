import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model";
import { JwtPayload } from 'jsonwebtoken';
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

    validateAccessToken(token: string): JwtPayload | null {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_KEY) as JwtPayload;
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string): JwtPayload | null {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_KEY) as JwtPayload;
            return userData;
        } catch (error) {
            return null;
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

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData;
    }
}

export default new TokenService();