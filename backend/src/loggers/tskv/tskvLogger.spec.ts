import { TskvLogger } from './tskvLogger';

describe('TSKV Logger', () => {
  const setupMocks = (loggerInstance: TskvLogger) => {
    const logSpy = jest.spyOn(loggerInstance, 'log');
    const superLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    return { logSpy, superLogSpy };
  };

  afterEach(() => {
    setupMocks(new TskvLogger()).superLogSpy.mockClear();
  });

  describe('Instance definition with/without prefix', () => {
    it('Should create instance', () => {
      const logger = new TskvLogger();
      expect(logger).toBeDefined();
    });
  });

  describe('Log formatting', () => {
    it('Should call super.log with formatted TSKV message', () => {
      const logger = new TskvLogger();
      const { logSpy, superLogSpy } = setupMocks(logger);

      logger.log('hello world');

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('hello world');
      expect(superLogSpy).toHaveBeenCalledWith(
        'level=log\tmessage=hello world\n',
      );
    });

    it('Should call super.log with formatted JSON message with additional args', () => {
      const logger = new TskvLogger();
      const { logSpy, superLogSpy } = setupMocks(logger);
      const extraArgs = [{ meta: 'data' }];

      logger.log('hello world', ...extraArgs);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('hello world', { meta: 'data' });
      expect(superLogSpy).toHaveBeenCalledWith(
        'level=log\tmessage=hello world\tmeta=data\n',
      );
    });
  });
});
