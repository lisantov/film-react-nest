import { DevLogger } from './devLogger';
import { ConsoleLogger } from "@nestjs/common";

describe('Dev Logger', () => {
    const setupMocks = (loggerInstance: DevLogger) => {
        const logSpy = jest.spyOn(loggerInstance, 'log');
        const superLogSpy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation(() => {});
        return { logSpy, superLogSpy };
    };

    describe('Instance definition with/without prefix', () => {
        it('Should create instance without prefix', () => {
            const logger = new DevLogger();
            expect(logger).toBeDefined();
        });

        it('Should create instance with prefix', () => {
            const logger = new DevLogger('API');
            expect(logger).toBeDefined();
        });
    });

    describe('Log method with/without prefix', () => {
        it('Should call super.log with formatted message without prefix', () => {
            const logger = new DevLogger();
            const { logSpy, superLogSpy } = setupMocks(logger);

            logger.log('hello world');

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith('hello world');
            expect(superLogSpy).toHaveBeenCalledWith('hello world');
        });

        it('Should call super.log with formatted message with prefix', () => {
            const logger = new DevLogger('TEST');
            const { logSpy, superLogSpy } = setupMocks(logger);

            logger.log('hello world');

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith('hello world');
            expect(superLogSpy).toHaveBeenCalledWith('TEST: hello world');
        });

        it('Should call super.log with additional args', () => {
            const logger = new DevLogger('TEST');
            const { logSpy, superLogSpy } = setupMocks(logger);
            const extraArgs = ['context', { meta: 'data' }];

            logger.log('message', ...extraArgs);

            expect(logSpy).toHaveBeenCalledWith('message', ...extraArgs);
            expect(superLogSpy).toHaveBeenCalledWith('TEST: message', ...extraArgs);
        });
    });
});