import { Injectable, ConsoleLogger} from "@nestjs/common";

@Injectable()
export class DevLogger extends ConsoleLogger {
    constructor(private readonly _prefix: string = '') {
        super();
    }

    log(message: string, ...args: any[]) {
        super.log(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }

    error(message: string, ...args: any[]) {
        super.error(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }

    warn(message: string, ...args: any[]) {
        super.warn(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }

    debug(message: string, ...args: any[]) {
        super.debug(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }

    verbose(message: string, ...args: any[]) {
        super.verbose(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }

    fatal(message: string, ...args: any[]) {
        super.fatal(`${this._prefix.toUpperCase()}: ${message}`, ...args);
    }
}
