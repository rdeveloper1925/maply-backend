export const ApiError = (status: number, message: string) => {
    return {
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
    };
};

export const NotFoundError = (message: string) => {
    return ApiError(404, message);
};

export const BadRequestError = (message: string) => {
    return ApiError(400, message);
};