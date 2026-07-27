import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from './utils';

describe('cn utility function', () => {
  test('merges basic class names', () => {
    assert.strictEqual(cn('px-2', 'py-1'), 'px-2 py-1');
  });

  test('handles conditional classes', () => {
    const isTrue = true;
    const isFalse = false;
    assert.strictEqual(
      cn('text-sm', isTrue && 'font-bold', isFalse && 'hidden'),
      'text-sm font-bold'
    );
  });

  test('resolves tailwind class conflicts', () => {
    assert.strictEqual(
      cn('p-2 p-4'),
      'p-4'
    );
    assert.strictEqual(
      cn('px-2 py-1', 'p-4'),
      'p-4'
    );
    assert.strictEqual(
      cn('bg-red-500', 'bg-blue-500'),
      'bg-blue-500'
    );
  });

  test('supports arrays and object syntax via clsx', () => {
    assert.strictEqual(
      cn(['text-lg', 'font-medium'], { 'bg-black': true, 'text-white': false }),
      'text-lg font-medium bg-black'
    );
  });
});
