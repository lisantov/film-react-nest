import { TskvLogger } from './tskvLogger';

describe('Logger', () => {
  it('should be defined', () => {
    expect(new TskvLogger()).toBeDefined();
  });
});
