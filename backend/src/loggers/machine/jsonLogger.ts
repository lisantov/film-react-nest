import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const extraArgs = Object.assign({}, ...optionalParams);
    return JSON.stringify({ level, message, ...extraArgs });
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
