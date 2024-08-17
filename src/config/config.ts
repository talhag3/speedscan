export const config = {
  verbose: process.env.VERBOSE === 'true',
  testMode: process.env.TEST_MODE === 'true',
  defaultServerId: process.env.DEFAULT_SERVER_ID || '',
};
