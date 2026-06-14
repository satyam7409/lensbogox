export class ApiResponse {
    public statusCode: number;
    public message: string;
    public data: any;
    public success: boolean;

    constructor(statusCode: number, data: any, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}