import { JsonLogger } from './jsonLogger';

describe('Logger', () => {
  it('should be defined', () => {
    expect(new JsonLogger()).toBeDefined();
  });
});
