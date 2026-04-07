import {Injectable, LoggerService} from "@nestjs/common";

@Injectable()
export class TskvLogger implements LoggerService {
    formatMessage(level: string, message: any, ...optionalParams: any[]) {
        optionalParams = optionalParams.map((k, i) => `optional-${i}=${k}`)
            .map((key) => `${key}=${optionalParams[key]}`);
        return `level=${level}\tmessage=${message}\t${optionalParams.join('\t')}\n`;
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('log', message, optionalParams));
    }

    error(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('error', message, optionalParams));
    }

    warn(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('warn', message, optionalParams));
    }
}
