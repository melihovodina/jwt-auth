import userModel from "../models/user-model";
import bcrypt from 'bcrypt';
import uuid from 'uuid'
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserDto from '../dtos/user-dto';

class UserService {
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email });
        if (candidate) {
            throw new Error("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await userModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
}

export default new UserService();