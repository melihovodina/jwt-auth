import express from 'express';

class UserController {
    async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
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