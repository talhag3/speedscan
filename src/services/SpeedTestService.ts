import speedTest from 'speedtest-net';
import { SpeedTestResult } from '../models/SpeedTestResult';
import { config } from '../config/config';

export interface SpeedTestService {
  run: () => Promise<SpeedTestResult>;
}

export class SpeedTestRunner implements SpeedTestService {
  async run(): Promise<SpeedTestResult> {
    if (config.testMode) {
      return {
        ping: { jitter: 0, latency: 0 },
        download: { bandwidth: 0, bytes: 0, elapsed: 0 },
        upload: { bandwidth: 0, bytes: 0, elapsed: 0 },
        timestamp: new Date(),
        server: {
          id: 0,
          name: 'Test Server',
          location: 'Local',
          country: 'Testland',
          host: 'localhost',
        },
      };
    }

    return await speedTest({
      acceptLicense: true,
      acceptGdpr: true,
      serverId: config.defaultServerId,
    });
  }
}
