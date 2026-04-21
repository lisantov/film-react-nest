import { JsonLogger } from './jsonLogger';

describe('JSON Logger', () => {
  const setupMocks = (loggerInstance: JsonLogger) => {
    const logSpy = jest.spyOn(loggerInstance, 'log');
    const superLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    return { logSpy, superLogSpy };
  };

  afterEach(() => {
    setupMocks(new JsonLogger()).superLogSpy.mockClear();
  });

  describe('Instance definition with/without prefix', () => {
    it('Should create instance', () => {
      const logger = new JsonLogger();
      expect(logger).toBeDefined();
    });
  });

  describe('Log formatting', () => {
    it('Should call super.log with formatted JSON message', () => {
      const logger = new JsonLogger();
      const { logSpy, superLogSpy } = setupMocks(logger);

      logger.log('hello world');

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('hello world');
      expect(superLogSpy).toHaveBeenCalledWith(
        '{"level":"log","message":"hello world"}',
      );
    });

    it('Should call super.log with formatted JSON message with additional args', () => {
      const logger = new JsonLogger();
      const { logSpy, superLogSpy } = setupMocks(logger);
      const extraArgs = [{ meta: 'data' }];

      logger.log('hello world', ...extraArgs);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('hello world', { meta: 'data' });
      expect(superLogSpy).toHaveBeenCalledWith(
        '{"level":"log","message":"hello world","meta":"data"}',
      );
    });
  });
});
