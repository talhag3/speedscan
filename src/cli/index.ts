#!/usr/bin/env node

import { SpeedTestRunner } from '../services/SpeedTestService';
import { config } from '../config/config';
import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(2))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .option('server', {
    alias: 's',
    type: 'string',
    description: 'Specify a server ID',
  })
  .help()
  .parseSync(); // Use parseSync() to ensure synchronous parsing

async function runSpeedTest() {
  const runner = new SpeedTestRunner();

  if (argv.verbose) {
    console.log('Verbose mode enabled');
  }

  if (argv.server) {
    config.defaultServerId = argv.server;
    console.log(`Testing with server: ${argv.server}`);
  }

  console.log('Running speed test...');

  try {
    const result = await runner.run();
    console.log(`Ping: ${result.ping.latency} ms`);
    console.log(
      `Download Speed: ${(result.download.bandwidth / 125000).toFixed(2)} Mbps`,
    );
    console.log(
      `Upload Speed: ${(result.upload.bandwidth / 125000).toFixed(2)} Mbps`,
    );
  } catch (error) {
    console.error('Error running speed test:', error);
  }
}

runSpeedTest();
