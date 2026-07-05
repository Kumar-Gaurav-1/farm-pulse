import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
  it('should merge basic class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle tailwind class merging correctly', () => {
    // tailwind-merge logic: p-4 should override p-2
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle conditional classes using objects', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should ignore falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '')).toBe('class1');
  });

  it('should handle complex mixed inputs', () => {
    const isActive = true;
    const isHovered = false;

    expect(
      cn(
        'base-class p-2',
        isActive && 'active-class p-4',
        isHovered && 'hover-class',
        { 'conditional-class': true },
        ['array-class1', 'array-class2']
      )
    ).toBe('base-class active-class p-4 conditional-class array-class1 array-class2');
  });
});
