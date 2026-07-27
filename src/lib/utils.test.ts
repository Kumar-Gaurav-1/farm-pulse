import { describe, it } from 'node:test';
import assert from 'node:assert';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    assert.strictEqual(result, 'class1 class2');
  });

  it('handles conditional classes', () => {
    const isTrue = true;
    const isFalse = false;
    const result = cn('class1', isTrue && 'class2', isFalse && 'class3');
    assert.strictEqual(result, 'class1 class2');
  });

  it('handles arrays and objects', () => {
    const result = cn(['class1', 'class2'], { class3: true, class4: false });
    assert.strictEqual(result, 'class1 class2 class3');
  });

  it('resolves tailwind merge conflicts correctly', () => {
    const result = cn('p-4 p-2', 'bg-red-500 bg-blue-500');
    assert.strictEqual(result, 'p-2 bg-blue-500');
  });

  it('handles null, undefined, and false values gracefully', () => {
    const result = cn('class1', null, undefined, false, 'class2');
    assert.strictEqual(result, 'class1 class2');
  });

  it('resolves complex tailwind conflict cases', () => {
    const result = cn('text-sm text-lg', 'font-bold font-normal', 'flex inline-flex');
    assert.strictEqual(result, 'text-lg font-normal inline-flex');
  });
});
