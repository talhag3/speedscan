import { execSync } from 'child_process';
import path from 'path';

const cliPath = path.join(__dirname, '../../dist/cli/index.js');

describe('CLI Tests', () => {
  it('should run the speed test with default settings', () => {
    const output = execSync(`node ${cliPath}`).toString();
    expect(output).toContain('Running speed test...');
  });

  it('should enable verbose mode', () => {
    const output = execSync(`node ${cliPath} --verbose`).toString();
    expect(output).toContain('Verbose mode enabled');
  });

  it('should use a specific server', () => {
    const serverId = '1234';
    const output = execSync(`node ${cliPath} --server ${serverId}`).toString();
    expect(output).toContain(`Testing with server: ${serverId}`);
  });
});
