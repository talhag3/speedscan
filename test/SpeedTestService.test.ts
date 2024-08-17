import { SpeedTestRunner } from '../src/services/SpeedTestService';
import { SpeedTestResult } from '../src/models/SpeedTestResult';
import { config } from '../src/config/config';

jest.mock('speedtest-net', () => {
  return jest.fn().mockImplementation(() => {
    return {
      ping: { jitter: 2, latency: 20 },
      download: { bandwidth: 50000000, bytes: 10000000, elapsed: 8000 },
      upload: { bandwidth: 20000000, bytes: 4000000, elapsed: 5000 },
      timestamp: new Date(),
      server: {
        id: 1,
        name: 'Mock Server',
        location: 'Mock City',
        country: 'Mock Country',
        host: 'mockserver.com',
      },
    } as SpeedTestResult;
  });
});

describe('SpeedTestRunner', () => {
  it('should return a valid speed test result in normal mode', async () => {
    config.testMode = false;
    const runner = new SpeedTestRunner();
    const result = await runner.run();

    expect(result.ping.latency).toBeGreaterThan(0);
    expect(result.download.bandwidth).toBeGreaterThan(0);
    expect(result.upload.bandwidth).toBeGreaterThan(0);
    expect(result.server.name).toBe('Mock Server');
  });

  it('should return a valid speed test result in test mode', async () => {
    config.testMode = true;
    const runner = new SpeedTestRunner();
    const result = await runner.run();

    expect(result.server.name).toBe('Test Server');
    expect(result.server.id).toBe(0);
    expect(result.ping.latency).toBe(0);
  });
});
