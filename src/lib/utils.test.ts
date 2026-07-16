import { describe, it } from 'node:test';
import assert from 'node:assert';
import { cn } from './utils';

describe('cn utility function', () => {
  it('merges basic classes correctly', () => {
    assert.strictEqual(cn('px-2 py-1', 'bg-blue-500'), 'px-2 py-1 bg-blue-500');
  });

  it('overrides conflicting tailwind classes', () => {
    // Tailwind classes for the same CSS property should override previous ones
    assert.strictEqual(cn('px-2 p-4'), 'p-4');
    assert.strictEqual(cn('bg-red-500 bg-blue-500'), 'bg-blue-500');
    assert.strictEqual(cn('text-sm text-lg'), 'text-lg');
  });

  it('handles conditional classes', () => {
    // Falsy values and conditional objects should be handled properly
    assert.strictEqual(cn('p-4', { 'bg-red-500': true, 'text-white': false }), 'p-4 bg-red-500');
    assert.strictEqual(cn('p-4', null, undefined, false, 'flex'), 'p-4 flex');
  });

  it('handles array inputs', () => {
    assert.strictEqual(cn(['p-4', 'flex'], 'items-center'), 'p-4 flex items-center');
    assert.strictEqual(cn(['p-2', ['bg-red-500', 'text-white']]), 'p-2 bg-red-500 text-white');
  });
});
