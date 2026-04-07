import { DevLogger } from './devLogger';

describe('Logger', () => {
  it('should be defined', () => {
    expect(new DevLogger()).toBeDefined();
  });
});
