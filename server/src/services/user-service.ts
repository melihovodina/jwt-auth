import userModel from "../models/user-model";
import bcrypt from 'bcrypt';
import { v4 } from "uuid";
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserDto from '../dtos/user-dto';
import ApiError from "../exceptions/api-error";
import { config } from 'dotenv';
config({ path: '.env' });

const API_URL = process.env.API_URL;

class UserService {
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email });
        if (candidate) {
            throw ApiError.badRequest("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await userModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink: string) {
        const user = await userModel.findOne({ activationLink });
        if(!user) {
            throw ApiError.badRequest("Invalid activation link");
        }
        user.isActivated = true;
        await user.save();
    }
}

export default new UserService();