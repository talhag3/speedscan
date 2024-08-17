export interface PingResult {
  jitter: number;
  latency: number;
}

export interface BandwidthResult {
  bandwidth: number;
  bytes: number;
  elapsed: number;
}

export interface SpeedTestResult {
  ping: PingResult;
  download: BandwidthResult;
  upload: BandwidthResult;
  timestamp: Date;
  server: {
    id: number;
    name: string;
    location: string;
    country: string;
    host: string;
  };
}
