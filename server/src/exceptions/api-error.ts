class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    
    static unathorizedError() {
        return new ApiError(401, "User is unauthorized")
    }

    static badRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors)
    }
}

export default ApiError;