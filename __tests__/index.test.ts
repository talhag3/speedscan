import { helloWorld } from '../src/index';

test('should return Hello, World!', () => {
  expect(helloWorld()).toBe('Hello, World!');
});