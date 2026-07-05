import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should return empty string when no inputs are provided', () => {
    expect(cn()).toBe('');
  });

  it('should concatenate basic class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should filter out falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '', 'class2')).toBe('class1 class2');
  });

  it('should handle conditionals (clsx functionality)', () => {
    expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3');
  });

  it('should merge conflicting tailwind classes correctly (twMerge functionality)', () => {
    // Both define padding, twMerge should keep the last one
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], ['class3'])).toBe('class1 class2 class3');
  });

  it('should handle a mix of inputs: strings, objects, arrays, and conditionals', () => {
    const isTrue = true;
    const isFalse = false;
    expect(
      cn(
        'base-class',
        isTrue && 'conditional-true',
        isFalse && 'conditional-false',
        { 'obj-class-true': true, 'obj-class-false': false },
        ['array-class-1', 'array-class-2'],
        'p-4',
        'p-8' // overrides p-4
      )
    ).toBe('base-class conditional-true obj-class-true array-class-1 array-class-2 p-8');
  });
});
