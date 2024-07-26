import express from 'express';
import userService from '../services/user-service';

class UserController {
    async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true/*, secure: true*/})
            return res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(['123', '456']);
        } catch (error) {
            
        }
    }
}

export default new UserController();