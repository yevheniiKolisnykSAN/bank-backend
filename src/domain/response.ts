import {Status} from "../enum/status.enum"
import {Code} from "../enum/code.enum"

export class HttpResponse {
    private timestamp: string;
    constructor(
        private statusCode: Code,
        private httpStatus: Status,
        private message: string,
        private data?: any
    ) {
        this.timestamp = new Date().toLocaleString()
        this.statusCode = statusCode
        this.httpStatus = httpStatus
        this.message = message
        this.data = data
    }
}
