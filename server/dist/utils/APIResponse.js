export class ApiResponse {
    statusCode;
    message;
    data;
    success;
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}
//# sourceMappingURL=APIResponse.js.map