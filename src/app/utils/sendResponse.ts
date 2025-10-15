import { Response } from "express";

interface TMeta {
    total?: number;
    limit?: number;
    page?: number;
    totalPage?: number
};

interface TResponse<T> {
    statusCode: number,
    success: true,
    message: string,
    data: T;
    meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        meta: data.meta,
        data: data.data,
        message: data.message
    })
};