export declare class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: any[];
    constructor(statusCode: number, message?: string, errors?: any[], stack?: string);
}
//# sourceMappingURL=APIError.d.ts.map