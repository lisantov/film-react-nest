import {Injectable, LoggerService} from "@nestjs/common";

@Injectable()
export class TskvLogger implements LoggerService {
    formatMessage(level: string, message: any, ...optionalParams: any[]) {
        optionalParams = Object.assign({}, ...optionalParams)
        const outputParams = Object.keys(optionalParams)
            .map(k => `${k}=${optionalParams[k]}`).join('\t');
        return `level=${level}\tmessage=${message}${outputParams ? '\t' + outputParams : ''}\n`;
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('log', message, ...optionalParams));
    }

    error(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('error', message, ...optionalParams));
    }

    warn(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('warn', message, ...optionalParams));
    }
}
